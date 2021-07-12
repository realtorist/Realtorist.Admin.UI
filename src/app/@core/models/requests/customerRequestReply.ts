import * as moment from "moment";

export interface CustomerRequestReply {
    id: string;
    read: boolean;
    fromCustomer: boolean;
    dateTimeUtc: moment.Moment;
    message: string;
}