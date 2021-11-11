import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Listing } from "../models/listings/listing";
import { Page } from "../models/pages/page";
import { ListingFeedSetting } from '../models/settings/listingFeedSetting';

export abstract class  IListingsApi {
    abstract getListing(id: string): Observable<Listing>;
    abstract deleteListing(id: string): Observable<HttpResponse<any>>;
    abstract updateListing(listingId: string, listing: Listing): Observable<HttpResponse<any>>;
    abstract addListing(listing: Listing): Observable<string>;
    abstract markAsFeatured(id: string, featured: boolean): Observable<any>;
    abstract markAsDisabled(id: string, disabled: boolean): Observable<any>;
    abstract launchUpdate(source: ListingFeedSetting): Observable<any>;
    abstract getFeedTypes(): Observable<string[]>;
}