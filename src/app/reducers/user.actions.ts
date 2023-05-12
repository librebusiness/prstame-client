import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";

export enum UserActionTypes {
    loadProfileStart = '[User] load profile request',
    loadProfileFailed = '[User] load profile failed',
    loadProfileSuccess = '[User] load profile success',
}

export const loadProfileStartAction = createAction(UserActionTypes.loadProfileStart)

export const loadProfileFailedAction = createAction(UserActionTypes.loadProfileFailed)

export const loadProfileSuccessAction = createAction(
    UserActionTypes.loadProfileSuccess,
    props<{ data: User }>()
)
