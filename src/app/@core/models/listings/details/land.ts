import { Sewer } from '../lookups/sewer';
import { FrontsOn } from '../lookups/frontsOn';
import { FenceType } from '../lookups/fenceType';
import { CurrentUse } from '../lookups/currentUse';
import { Measurement } from '../units/Measurement';

export interface Land {
    /**
     * The total size of the property
     */
    sizeTotal?: Measurement;
    /**
     * The amount of frontage of the property
     */
    sizeFrontage?: Measurement;
    /**
     * Whether the property has acreage or not
     */
    acreage?: boolean;
    /**
     * What the land is currently used for
     */
    currentUse?: CurrentUse[];
    /**
     * Whether the land is divisible or not (True/False)
     */
    divisible?: boolean;
    /**
     * The type of fence
     */
    fenceType?: FenceType[];
    /**
     * The front type
     */
    frontsOn?: FrontsOn;
    /**
     * List of sewer types on the land
     */
    sewer?: Sewer[];
    /**
     * The depth of the land
     */
    sizeDepth?: Measurement;
    /**
     * The size of irregular land
     */
    sizeIrregular?: string;
}