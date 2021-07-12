import { createReducer, on } from '@ngrx/store';
import { Profile } from '../../@core/models/user/profile';
import { UserCurrentState } from '../../@core/models/user/userState';
import { loadProfileSuccess, loadUserStateSuccess } from '../actions/user.actions';

export  interface UserState {
    profile: Profile;
    state: UserCurrentState
}

const initialState: UserState = {
    profile: null,
    state: null
};

const _userReducer = createReducer(
    initialState,
    on(loadProfileSuccess, (state,  props) => ({
        ...state,
        profile: props.profile
    })),
    on(loadUserStateSuccess, (state, props) => ({
        ...state,
        state: props.state
    })),
);

export function userReducer(state, action) {
    return _userReducer(state, action);
}