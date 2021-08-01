import { ListingSource } from './listings/enums/listingSource';
import { addLookupValuesToDisplayMap } from "./listings/lookups/displayValues"

export interface IEnumDisplayMap {
    [key: string]: { [key in number | string]: string; };
}

export const EnumDisplayMap : IEnumDisplayMap = {
    ListingSource: {
        [ListingSource.Manual]: 'User',
        [ListingSource.Crea]: 'CREA'
    }
}

addLookupValuesToDisplayMap(EnumDisplayMap);