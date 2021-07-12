import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ISettingsApi } from "../abstractions/settings.api";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class SettingsApi extends ISettingsApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/settings/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }
    
    getSetting<T>(type: string): Observable<T> {
        return this.httpClient.get<T>(this.apiBaseUrl + type);
    }

    updateSetting(type: string, value: any): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(this.apiBaseUrl + type, value);
    }
}