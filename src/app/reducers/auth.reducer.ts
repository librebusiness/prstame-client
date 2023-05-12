import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from "../interfaces/user";
import { AppState } from '.';

export interface AuthState {
    user?: User,
    auth_token: string,
    message: string,
    status: 'idle' | 'loading' | 'loaded' | 'failed' | 'requesting password' | 'request failed' | 'request success' | 'restoring password' | 'restore failed' | 'restore success',
}

export const initialAuthState: AuthState = {
    status: 'idle',
    message: '',
    auth_token: '',
}

export const authSelector = (state: AppState) => state.auth;

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginStartAction, (state, payload) => {
        console.log('Login request started with credentials: ', payload)
        return { ...state, status: 'loading' };
    }),
    on(AuthActions.loginFailedAction, (state, payload) => {
        console.log('Login action failed!', payload);
        return { ...state, status: 'failed', message: payload.message };
    }),
    on(AuthActions.loginSuccessAction, (state, payload) => {
        console.log('Login action success!', payload);
        localStorage.setItem('access_token', payload.token);
        return {
            ...state,
            status: 'loaded',
            auth_token: payload.token,
            message: payload.message,
            user: payload.data
        };
    }),
    on(AuthActions.signupStartAction, (state, payload) => {
        console.log('Signup request started with credentials: ', payload)
        return { ...state, status: 'loading' };
    }),
    on(AuthActions.signupFailedAction, (state, payload) => {
        console.log('Signup action failed!', payload);
        return { ...state, status: 'failed', message: payload.message };
    }),
    on(AuthActions.signupSuccessAction, (state, payload) => {
        console.log('Signup action success!', payload);
        localStorage.setItem('access_token', payload.token);
        return {
            ...state,
            status: 'loaded',
            auth_token: payload.token,
            message: payload.message,
            user: payload.data
        };
    }),
    on(AuthActions.loadUserSuccessAction, (state, payload) => {
        console.log('loadUserSuccessAction');
        return {
            ...state,
            user: payload.data,
            status: 'loaded',
            message: payload.message,
        }
    }),
    on(AuthActions.loadUserFailedAction, (state, payload) => {
        console.log('loadUserFailedAction');
        return {
            ...state,
            status: 'failed',
            message: payload.message,
        }
    }),
    on(AuthActions.loadUserStartAction, (state) => {
        console.log('loadUserStartAction');
        return {
            ...state,
            status: 'loading',
        }
    }),
    on(AuthActions.userLogoutAction, (state) => {
        return { ...initialAuthState, status: 'failed' };
    }),
    on(AuthActions.passwordRecoveryRequestStartAction, (state, payload) => {
        console.log('passwordRecoveryRequestStartAction', payload);
        return { ...state, status: 'requesting password' };
    }),
    on(AuthActions.passwordRecoveryRequestFailedAction, (state, payload) => {
        console.log('passwordRecoveryRequestFailedAction', payload);
        return { ...state, status: 'request failed', message: payload.reason };
    }),
    on(AuthActions.passwordRecoveryRequestSuccessAction, (state, payload) => {
        console.log('passwordRecoveryRequestSuccessAction', payload);
        return { ...state, status: 'request success', message: payload.message };
    }),
    on(AuthActions.passwordRestoreRequestStartAction, (state, payload) => {
        console.log('passwordRestoreRequestStartAction', payload);
        return { ...state, status: 'restoring password' };
    }),
    on(AuthActions.passwordRestoreRequestFailedAction, (state, payload) => {
        console.log('passwordRestoreRequestFailedAction', payload);
        return { ...state, status: 'restore failed', message: payload.reason };
    }),
    on(AuthActions.passwordRestoreRequestSuccessAction, (state, payload) => {
        console.log('passwordRestoreRequestSuccessAction', payload);
        return { ...state, status: 'restore success', message: payload.message };
    }),
);