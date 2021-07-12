import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { loadUserStateRequest } from '../../@store/actions/user.actions';
import { AppState } from '../../@store/appStore';
import { ICustomerRequestsApi } from "../abstractions/customer-requests.api";
import { CustomerRequest } from "../models/requests/customerRequest";
import { Reply } from "../models/requests/reply";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class CustomerRequestsApi extends ICustomerRequestsApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/requests/';
    constructor(private readonly httpClient: HttpClient, private store: Store<AppState>) {
        super();
    }

    get(id: string): Observable<CustomerRequest> {
        return this.httpClient.get<CustomerRequest>(this.apiBaseUrl + id);
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(this.apiBaseUrl + id);
    }

    markAsRead(id: string, isRead: boolean): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(`${this.apiBaseUrl}${id}/read?read=${isRead}`, null)
            .pipe(tap(_ => this.store.dispatch(loadUserStateRequest())));
    }

    markAllAsRead(): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(`${this.apiBaseUrl}read`, null)
            .pipe(tap(_ => this.store.dispatch(loadUserStateRequest())));
    }

    reply(requestId: string, reply: Reply): Observable<HttpResponse<any>> {
        return this.httpClient.put<HttpResponse<any>>(`${this.apiBaseUrl}${requestId}/reply`, reply)
            .pipe(tap(_ => this.store.dispatch(loadUserStateRequest())));
    }
}