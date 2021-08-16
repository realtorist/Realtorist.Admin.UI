import { CustomerRequestType } from "./customerRequestType";
import { IAm } from "./iAm";

export interface CustomerRequestInformation {
    listingId?: string;
    address?: string;
    name: string;
    phone: string;
    type: CustomerRequestType;
    iam: IAm;
    message: string;
}
