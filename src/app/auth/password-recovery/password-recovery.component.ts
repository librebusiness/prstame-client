import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthActionTypes } from 'src/app/reducers/auth.actions';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {

  recoveryForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
  });

  requesting = this.store.select(state => state.auth.status == 'requesting password');
  success = this.store.select(state => state.auth.status == 'request success');
  failed = this.store.select(state => state.auth.status == 'request failed');
  message = this.store.select(state => state.auth.message);

  constructor(
    private store: Store<AppState>,
  ) {
  }

  onSubmit() {
    this.store.dispatch({ type: AuthActionTypes.passwordRecoveryRequestStart, ...this.recoveryForm.value })
  }

}
