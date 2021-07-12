import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class  ISettingsApi {
    abstract getSetting<T>(type: string): Observable<T>;

    abstract updateSetting(type: string, value: any): Observable<HttpResponse<any>>;
}