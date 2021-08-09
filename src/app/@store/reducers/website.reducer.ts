import { createReducer, on } from '@ngrx/store';
import { SiteLink } from '../../@core/models/links/siteLinks';
import { loadSiteLinksSuccess } from '../actions/website.actions';

export  interface WebsiteState {
    links: SiteLink[];
}

const initialState: WebsiteState = {
    links: []
};

const _wesbiteReducer = createReducer(
    initialState,
    on(loadSiteLinksSuccess, (state,  props) => ({
        ...state,
        links: props.links
    })),
);

export function websiteReducer(state, action) {
    return _wesbiteReducer(state, action);
}