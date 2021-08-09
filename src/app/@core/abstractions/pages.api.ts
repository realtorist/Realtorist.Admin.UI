import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "../models/pages/page";

export abstract class  IPagesApi {
    abstract getPage(id: string): Observable<Page>;
    abstract deletePage(id: string): Observable<HttpResponse<any>>;
    abstract updatePage(pageId: string, page: Page): Observable<HttpResponse<any>>;
    abstract addPage(page: Page): Observable<string>;
    abstract isLinkInUse(link: string, idsToExclude: string[]): Observable<boolean>;
}