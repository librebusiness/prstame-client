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
    loadUserStart = '[Auth] load user request',
    loadUserFailed = '[Auth] load user success',
    loadUserSuccess = '[Auth] load user failed',
    userLogout = '[Auth] user logout',
    passwordRecoveryRequestStart = '[Auth] password recovery request start',
    passwordRecoveryRequestFailed = '[Auth] password recovery request failed',
    passwordRecoveryRequestSuccess = '[Auth] password recovery request success',
    passwordRestoreRequestStart = '[Auth] password restore request start',
    passwordRestoreRequestFailed = '[Auth] password restore request failed',
    passwordRestoreRequestSuccess = '[Auth] password restore request success',
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
    props<{ message: string, code: number, data: User, token: string }>(),
);

export const loadUserStartAction = createAction(AuthActionTypes.loadUserStart);

export const loadUserFailedAction = createAction(
    AuthActionTypes.loadUserFailed,
    props<{ message: string, code: number }>(),
);

export const loadUserSuccessAction = createAction(
    AuthActionTypes.loadUserSuccess,
    props<{ message: string, data: User }>(),
);

export const userLogoutAction = createAction(AuthActionTypes.userLogout);

export const passwordRecoveryRequestStartAction = createAction(
    AuthActionTypes.passwordRecoveryRequestStart,
    props<{ email: string }>(),
);

export const passwordRecoveryRequestFailedAction = createAction(
    AuthActionTypes.passwordRecoveryRequestFailed,
    props<{ reason: string, code: string }>(),
);

export const passwordRecoveryRequestSuccessAction = createAction(
    AuthActionTypes.passwordRecoveryRequestSuccess,
    props<{ message: string }>(),
);

export const passwordRestoreRequestStartAction = createAction(
    AuthActionTypes.passwordRestoreRequestStart,
    props<{ _id: string, token: string, password: string }>(),
);

export const passwordRestoreRequestFailedAction = createAction(
    AuthActionTypes.passwordRestoreRequestFailed,
    props<{ reason: string, code: string }>(),
);

export const passwordRestoreRequestSuccessAction = createAction(
    AuthActionTypes.passwordRestoreRequestSuccess,
    props<{ message: string }>(),
);
