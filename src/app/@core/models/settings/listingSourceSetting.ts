import * as moment from 'moment';
import { ListingSource } from '../listings/enums/listingSource';

export interface ListingSourceSetting {
    listingSource: ListingSource;
    baseUrl: string;
    username: string;
    password: string;
    destinationId: number;
    updateTime: string;
}