import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { AuthActionTypes } from "../auth.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { LoginPayload } from "src/app/interfaces/login-payload";
import { SignupPayload } from "src/app/interfaces/signup-payload";
import { User } from "src/app/interfaces/user";
import { LoginResponse } from "src/app/interfaces/login-response";
import { SignupResponse } from "src/app/interfaces/signup-response";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.loginStart),
            exhaustMap((payload: LoginPayload) => this.authService.login(payload)
                .pipe(
                    map((response: LoginResponse) => ({ type: AuthActionTypes.loginSuccess, code: response.code, data: response.data, message: response.message, token: response.token })),
                    catchError((response: SignupResponse) => of({type: AuthActionTypes.loginFailed, code: response.code, message: response.message }))
                )
            )
        )
    )

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.signupStart),
            exhaustMap((payload: SignupPayload) => this.authService.signup(payload)
                .pipe(
                    map((response: SignupResponse) => ({ type: AuthActionTypes.signupSuccess, code: response.code, message: response.message })),
                    catchError((response: SignupResponse) => of({type: AuthActionTypes.signupFailed, code: response.code, message: response.message }))
                )
            )
        )
    )
}