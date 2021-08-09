import { createAction, props } from '@ngrx/store';
import { SiteLink } from '../../@core/models/links/siteLinks';

export enum WebsiteActions {
    LoadSiteLinksRequest = '[User] Load Site Links Request',
    LoadSiteLinksSuccess = '[User] Load Site Links Success',
};

export const loadSiteLinksRequest = createAction(WebsiteActions.LoadSiteLinksRequest);
export const loadSiteLinksSuccess = createAction(WebsiteActions.LoadSiteLinksSuccess, props<{ links: SiteLink[] }>());