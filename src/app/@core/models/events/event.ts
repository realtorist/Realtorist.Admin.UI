import * as moment from 'moment';
import { EventLevel } from './eventLevel';
import { EventType } from './eventType';

export interface Event {
    id: string;
    level: EventLevel;
    type: EventType;
    title: string;
    message: string;
    createdAt: moment.Moment;
}