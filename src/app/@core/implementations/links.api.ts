import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ILinksApi } from '../abstractions/links.api';
import { SiteLink } from '../models/links/siteLinks';
import { apiServerUrl } from './serverUrl';

@Injectable()
export class LinksApi extends ILinksApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/links/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    getSiteLinks(): Observable<SiteLink[]> {
        return this.httpClient.get<SiteLink[]>(this.apiBaseUrl);
    }
}