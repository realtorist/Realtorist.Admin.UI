import * as moment from "moment";

export interface MediaFile {
    url: string;
    id: string;
    name: string;
    size: number;
    createdAt: moment.Moment;
}