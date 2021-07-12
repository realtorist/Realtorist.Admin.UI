import { createSelector } from '@ngrx/store';
import { AppState } from '../appStore';

export const selectUserState = (state: AppState) => state.user;

export const selectProfile = createSelector(
    selectUserState,
    state => state.profile
);

export const selectUserCurrentState = createSelector(
    selectUserState,
    state => state.state
);