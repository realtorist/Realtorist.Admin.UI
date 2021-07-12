import { RoomLevel } from '../lookups/roomLevel';
import { RoomType } from '../lookups/roomType';

export interface Room {
    /**
     * Type of room
     */
    type?: RoomType;
    /**
     * The level of the room
     */
    level?: RoomLevel;
    /**
     * General description of the room
     */
    description?: string;
    /**
     * The dimensions of the room
     */
    dimension?: string;
}