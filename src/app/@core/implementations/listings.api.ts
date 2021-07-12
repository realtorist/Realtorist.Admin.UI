import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IListingsApi } from "../abstractions/listings.api";
import { Listing } from "../models/listings/listing";
import { Page } from "../models/pages/page";
import { apiServerUrl } from './serverUrl';

@Injectable()
export class ListingsApi extends IListingsApi {
    private readonly apiBaseUrl = apiServerUrl() + '/api/admin/listings/';
    constructor(private readonly httpClient: HttpClient) {
        super();
    }
    
    markAsFeatured(id: string, featured: boolean): Observable<any> {
        const url = this.apiBaseUrl + id + (featured ? '/feature' : '/unfeature');
        return this.httpClient.post(url, null);
    }

    markAsDisabled(id: string, disabled: boolean): Observable<any> {
        const url = this.apiBaseUrl + id + (disabled ? '/disable' : '/enable');
        return this.httpClient.post(url, null);
    }

    getListing(id: string): Observable<Listing> {
        return this.httpClient.get<Listing>(this.apiBaseUrl + id);
    }
    deleteListing(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete<HttpResponse<any>>(this.apiBaseUrl + id);
    }
    updateListing(listingId: string, listing: Listing): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(this.apiBaseUrl + listingId, listing);
    }
    addListing(listing: Listing): Observable<string> {
        return this.httpClient.put<string>(this.apiBaseUrl, listing);
    }
}