import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IPagesApi } from "../abstractions/pages.api";
import { Page } from "../models/pages/page";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class PagesApi extends IPagesApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/pages/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }
    
    getPage(id: string): Observable<Page> {
        return this.httpClient.get<Page>(this.apiBaseUrl + id);
    }

    deletePage(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(this.apiBaseUrl + id);
    }

    updatePage(pageId: string, page: Page): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(this.apiBaseUrl + pageId, page);
    }

    addPage(page: Page): Observable<string> {
        return this.httpClient.put<string>(this.apiBaseUrl, page);
    }
    
}