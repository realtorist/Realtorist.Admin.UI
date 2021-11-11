import { addLookupValuesToDisplayMap } from "./listings/lookups/displayValues"
import { SocialNetwork } from './settings/socialSettings';

export interface IEnumDisplayMap {
    [key: string]: { [key in number | string]: string; };
}

export const EnumDisplayMap : IEnumDisplayMap = {
    SocialNetwork: {
        [SocialNetwork.Facebook]: 'Facebook',
        [SocialNetwork.Instagram]: 'Instagram',
        [SocialNetwork.Twitter]: 'Twitter',
        [SocialNetwork.LinkedIn]: 'LinkedIn'
    }
}

addLookupValuesToDisplayMap(EnumDisplayMap);