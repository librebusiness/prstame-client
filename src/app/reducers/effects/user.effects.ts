import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { UserActionTypes } from "../user.actions";
import { catchError, exhaustMap, map } from "rxjs";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.loadProfileStart),
            exhaustMap(() => this.userService.getProfile()
                .pipe(
                    map(response => ({ type: UserActionTypes.loadProfileSuccess, response })),
                    catchError(error => of({ type: UserActionTypes.loadProfileFailed, reason: error.message }))
                )
            )
        )
    )
}