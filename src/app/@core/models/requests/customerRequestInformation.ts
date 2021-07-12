import { CustomerRequestType } from "./CustomerRequestType";
import { IAm } from "./IAm";

export interface CustomerRequestInformation {
    listingId?: string;
    address?: string;
    name: string;
    phone: string;
    type: CustomerRequestType;
    iam: IAm;
    message: string;
}
