import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/reducers/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  constructor(
    private store: Store<AppState>
    ) {
  }

  onSubmit() {
    this.store.dispatch({ type: AuthActionTypes.signupStart, ...this.signupForm.value })
  }

}
