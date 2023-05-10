import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/reducers/auth.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private store: Store<AppState>,
  ) {
  }

  onSubmit() {
    this.store.dispatch({type: AuthActionTypes.loginStart, ...this.loginForm.value })
  }

}
