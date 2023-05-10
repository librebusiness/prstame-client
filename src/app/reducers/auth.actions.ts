import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user';
import { LoginPayload } from '../interfaces/login-payload';
import { SignupPayload } from '../interfaces/signup-payload';

export enum AuthActionTypes {
    loginStart = '[Auth] login start',
    loginFailed = '[Auth] login failed',
    loginSuccess = '[Auth] login success',
    signupStart = '[Auth] signup start',
    signupFailed = '[Auth] signup failed',
    signupSuccess = '[Auth] signup success',
}

export const loginStartAction = createAction(
    AuthActionTypes.loginStart,
    props<LoginPayload>(),
);

export const loginFailedAction = createAction(
    AuthActionTypes.loginFailed,
    props<{ message: string, code: number }>(),
);

export const loginSuccessAction = createAction(
    AuthActionTypes.loginSuccess,
    props<{ message: string, code: number, data: User, token: string }>(),
);

export const signupStartAction = createAction(
    AuthActionTypes.signupStart,
    props<SignupPayload>(),
);

export const signupFailedAction = createAction(
    AuthActionTypes.signupFailed,
    props<{ message: string, code: number }>(),
);

export const signupSuccessAction = createAction(
    AuthActionTypes.signupSuccess,
    props<{ message: string, code: number }>(),
);