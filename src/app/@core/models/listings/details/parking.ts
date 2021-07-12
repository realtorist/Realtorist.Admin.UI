import { ParkingType } from '../lookups/parkingType';

export interface Parking {
    /**
     * Type of parking available
     */
    name: ParkingType;
    /**
     * Number of spaces for the associated parking type
     */
    spaces?: number;
}