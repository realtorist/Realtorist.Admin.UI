import * as moment from "moment";

export interface Comment {
    id: string;
    postId: string;
    name: string;
    email: string;
    date: moment.Moment;
    message: string;
}