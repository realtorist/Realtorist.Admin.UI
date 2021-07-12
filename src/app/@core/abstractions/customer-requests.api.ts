import { Observable } from "rxjs";
import { CustomerRequest } from "../models/requests/customerRequest";
import { Reply } from "../models/requests/reply";

export abstract class  ICustomerRequestsApi {
    abstract delete(id: string): Observable<any>;
    abstract get(id: string): Observable<CustomerRequest>;
    abstract markAsRead(id: string, isRead: boolean): Observable<any>;
    abstract markAllAsRead(): Observable<any>;
    abstract reply(requestId: string, reply: Reply): Observable<any>;
}