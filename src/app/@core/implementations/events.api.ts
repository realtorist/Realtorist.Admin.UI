import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEventsApi } from '../abstractions/events.api';
import { apiServerUrl } from './serverUrl';

@Injectable()
export class EventsApi extends IEventsApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/events/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    deleteAll(): Observable<number> {
        return this.httpClient.delete<number>(this.apiBaseUrl);
    }
}