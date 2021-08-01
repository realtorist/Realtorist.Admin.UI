import { Observable } from "rxjs";

export abstract class  IEventsApi {
    abstract deleteAll(): Observable<number>;
}