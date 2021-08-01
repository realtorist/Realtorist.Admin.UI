import { EnumDisplayMap } from '../enumDisplayMap';

export enum EventType
{
    Generic = 'generic',
    ListingUpdate = 'listingUpdate',
    CustomerRequest = 'customerRequest',
    AccountCreated = 'accountCreated'
}

EnumDisplayMap.EventType = {
    [EventType.Generic]: 'Generic',
    [EventType.ListingUpdate]: 'Listing update',
    [EventType.CustomerRequest]: 'Customer request',
    [EventType.AccountCreated]: 'New account',
}