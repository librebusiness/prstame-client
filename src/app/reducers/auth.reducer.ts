import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from "../interfaces/user";
import { AppState } from '.';

export interface AuthState {
    user?: User,
    auth_token: string,
    message: string,
    status: 'idle' | 'loading' | 'loaded' | 'failed',
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
        return {
            ...state,
            status: 'idle',
            message: payload.message,
        };
    }),
)