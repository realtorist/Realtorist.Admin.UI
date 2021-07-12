import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IUserApi } from '../../@core/abstractions/user.api';
import { loadProfileRequest, loadProfileSuccess, loadUserStateRequest, loadUserStateSuccess, UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {

    loadProfile$ = createEffect(() => this.actions$.pipe(
        ofType(loadProfileRequest),
        mergeMap(() => this.api.getProfile()
            .pipe(
                map(profile => loadProfileSuccess({ profile })),
                catchError(() => EMPTY)
            ))
        )
    );

    loadState$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserStateRequest),
        mergeMap(() => this.api.getState()
            .pipe(
                map(state => loadUserStateSuccess({ state })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private api: IUserApi
    ) { }
}