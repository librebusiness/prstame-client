import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { AuthActionTypes } from "../auth.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { LoginPayload } from "src/app/interfaces/login-payload";
import { SignupPayload } from "src/app/interfaces/signup-payload";
import { LoginResponse } from "src/app/interfaces/login-response";
import { SignupResponse } from "src/app/interfaces/signup-response";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.loginStart),
            exhaustMap((payload: LoginPayload) => this.authService.login(payload)
                .pipe(
                    map((response: LoginResponse) => {
                        if (response.code == 201) {
                            return {
                                type: AuthActionTypes.loginSuccess,
                                code: response.code,
                                data: response.data,
                                message: response.message,
                                token: response.token
                            };
                        } else {
                            return {
                                type: AuthActionTypes.loginFailed,
                                code: response.code,
                                message: response.message
                            };
                        }
                    }),
                    catchError((response: SignupResponse) => of({type: AuthActionTypes.loginFailed, code: response.code, message: response.message }))
                )
            )
        )
    );

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.signupStart),
            exhaustMap((payload: SignupPayload) => this.authService.signup(payload)
                .pipe(
                    map((response: LoginResponse) => {
                        if (response.code == 201) {
                            return {
                                type: AuthActionTypes.signupSuccess,
                                code: response.code,
                                data: response.data,
                                message: response.message,
                                token: response.token
                            };
                        } else {
                            return {
                                type: AuthActionTypes.signupFailed,
                                code: response.code,
                                message: response.message
                            };
                        }
                    }),
                    catchError((response: SignupResponse) => of({type: AuthActionTypes.signupFailed, code: response.code, message: response.message }))
                )
            )
        )
    );

    requestPasswordRecovery$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.passwordRecoveryRequestStart),
            exhaustMap((payload: { email: string }) => this.authService.recoverPassword(payload.email)
                .pipe(
                    map((response: SignupResponse) => (response.code == 201 ? { type: AuthActionTypes.passwordRecoveryRequestSuccess, message: response.message } : { type: AuthActionTypes.passwordRecoveryRequestFailed, reason: response.message, code: response.code })),
                    catchError(response => of({ type: AuthActionTypes.passwordRecoveryRequestFailed, code: response.code, reason: response.message }))
                )
            )
        )
    );

    passwordRestore$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.passwordRestoreRequestStart),
            exhaustMap((payload: { password: string, _id: string, token: string }) => this.authService.resetPassword(payload)
                .pipe(
                    map((response: any) => (response.code == 201 ? { type: AuthActionTypes.passwordRestoreRequestSuccess, message: response.message } : { type: AuthActionTypes.passwordRestoreRequestFailed, reason: response.message, code: response.code })),
                    catchError(response => of({ type: AuthActionTypes.passwordRestoreRequestFailed, code: response.code, reason: response.message }))
                )
            )
        )
    );

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.loadUserStart),
            exhaustMap(() => this.userService.getProfile()
                .pipe(
                    map((response: any) => ({ type: AuthActionTypes.loadUserSuccess, message: response.message, data: response.data })),
                    catchError((response: any) => of({type: AuthActionTypes.loadUserFailed, code: response.code, message: response.message }))
                )
            )
        )
    );
}