import { createAction, props } from '@ngrx/store';
import { Profile } from '../../@core/models/user/profile';
import { UserCurrentState } from '../../@core/models/user/userState';

export enum UserActions {
    LoadProfileRequest = '[User] Load Profile Request',
    LoadProfileSuccess = '[User] Load Profile Success',
    LoadUserStateRequest = '[User] Load User State Request',
    LoadUserStateSuccess = '[User] Load User State Success',
};

export const loadProfileRequest = createAction(UserActions.LoadProfileRequest);
export const loadProfileSuccess = createAction(UserActions.LoadProfileSuccess, props<{ profile: Profile }>());

export const loadUserStateRequest = createAction(UserActions.LoadUserStateRequest);
export const loadUserStateSuccess = createAction(UserActions.LoadUserStateSuccess, props<{ state: UserCurrentState }>());