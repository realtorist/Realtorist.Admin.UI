import * as moment from "moment";
import { CustomerRequestInformation } from "./customerRequestInformation";
import { CustomerRequestReply } from "./customerRequestReply";

export interface CustomerRequest {
    id: string;
    read: boolean;
    dateTimeUtc: moment.Moment;
    request: CustomerRequestInformation;
    replies: CustomerRequestReply[];
}


