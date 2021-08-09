import { userReducer, UserState } from './reducers/user.reducer';
import { websiteReducer, WebsiteState } from './reducers/website.reducer';

export const AppStore = {
    user: userReducer,
    website: websiteReducer
}

export interface AppState {
    user: UserState
    website: WebsiteState
}

export const selectAppState = (state: AppState) => state;