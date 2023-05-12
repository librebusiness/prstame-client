import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthActionTypes } from 'src/app/reducers/auth.actions';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent {

  id = this.route.snapshot.paramMap.get('id');
  hash = this.route.snapshot.paramMap.get('hash');
  restoreForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    _id: new FormControl(''),
    token: new FormControl(''),
  });

  requesting = this.store.select(state => state.auth.status == 'restoring password');
  success = this.store.select(state => state.auth.status == 'restore success');
  failed = this.store.select(state => state.auth.status == 'restore failed');
  message = this.store.select(state => state.auth.message);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store.subscribe(state => {
      if (state.auth.message == 'Password updated') {
        setTimeout(() => {
          this.router.navigate(['/auth', 'login']);
        }, 2500);
      }
    })
    if (this.id) {
      this.restoreForm.get('_id')?.setValue(this.id);
    }
    if (this.hash) {
      this.restoreForm.get('token')?.setValue(this.hash);
    }
  }

  onSubmit() {
    const { password, passwordConfirm, _id, token } = this.restoreForm.value;
    if ((password.length >= 6 && password == passwordConfirm)) {
      this.store.dispatch({ type: AuthActionTypes.passwordRestoreRequestStart, password, _id, token });
    }
  }

}
