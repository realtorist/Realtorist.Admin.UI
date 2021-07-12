import * as moment from "moment";

export interface Event {
    /**
     * The open house start date and time
     */
    startDateTime: moment.Moment;
    /**
     * The open house End date and time
     */
    endDateTime: moment.Moment;
    /**
     * Comments about the open house
     */
    comments: string;
    /**
     * URL to the Live Stream
     */
    uRL: string;
}