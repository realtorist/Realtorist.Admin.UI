import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ILinksApi } from '../../@core/abstractions/links.api';
import { loadSiteLinksRequest, loadSiteLinksSuccess } from '../actions/website.actions';

@Injectable()
export class WebsiteEffects {

    loadSiteLinks$ = createEffect(() => this.actions$.pipe(
        ofType(loadSiteLinksRequest),
        mergeMap(() => this.linksApi.getSiteLinks()
            .pipe(
                map(links => loadSiteLinksSuccess({ links })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private linksApi: ILinksApi
    ) { }
}