import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { IUserApi } from '../abstractions/user.api';
import { Event } from '../models/events/event';
import { ChangePasswordModel } from '../models/user/changePassword';
import { Profile } from '../models/user/profile';
import { UserCurrentState } from '../models/user/userState';
import { apiServerUrl } from './serverUrl';

@Injectable()
export class UserApi extends IUserApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/profile/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    getProfile(): Observable<Profile> {
        return this.httpClient.get<Profile>(this.apiBaseUrl);
    }

    getState(): Observable<UserCurrentState> {
        return this.httpClient.get<UserCurrentState>(this.apiBaseUrl + 'state');
    }

    changePassword(model: ChangePasswordModel): Observable<any> {
        return this.httpClient.post<HttpResponse<any>>(apiServerUrl() + '/api/admin/auth/change-password', model);
    }
}