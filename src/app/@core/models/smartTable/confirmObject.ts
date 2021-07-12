import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Deferred } from './deferred';

export interface ConfirmObject<T> {
    data: T;
    newData: T;
    source: {
        data: T[];
    };
    confirm: Deferred<T>;
}