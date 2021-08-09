import { Observable } from "rxjs";
import { SiteLink } from '../models/links/siteLinks';

export abstract class  ILinksApi {
    abstract getSiteLinks(): Observable<SiteLink[]>;
}