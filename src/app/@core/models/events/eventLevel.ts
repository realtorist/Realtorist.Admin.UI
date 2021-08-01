import { EnumDisplayMap } from '../enumDisplayMap';

export enum EventLevel
{
    Info = 0,
    Success,
    Warning,
    Error
}

EnumDisplayMap.EventLevel = {
    [EventLevel.Info]: 'Information',
    [EventLevel.Success]: 'Success',
    [EventLevel.Warning]: 'Warning',
    [EventLevel.Error]: 'Error',
}