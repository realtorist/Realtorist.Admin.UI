import { userReducer, UserState } from './reducers/user.reducer';

export const AppStore = {
    user: userReducer
}

export interface AppState {
    user: UserState
}

export const selectAppState = (state: AppState) => state;