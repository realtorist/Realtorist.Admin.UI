import { createSelector } from '@ngrx/store';
import { AppState } from '../appStore';

export const selectWebsiteState = (state: AppState) => state.website;

export const selectSiteLinks = createSelector(
    selectWebsiteState,
    state => state.links
);