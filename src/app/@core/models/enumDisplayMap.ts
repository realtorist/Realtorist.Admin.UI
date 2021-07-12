import { addLookupValuesToDisplayMap } from "./listings/lookups/displayValues"

export interface IEnumDisplayMap {
    [key: string]: { [key in number | string]: string; };
}

export const EnumDisplayMap : IEnumDisplayMap = {
    ListingSource: {
        0: 'User',
        1: 'CREA'
    }
}

addLookupValuesToDisplayMap(EnumDisplayMap);