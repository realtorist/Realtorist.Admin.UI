import { UtilityType } from '../lookups/utilityType';

export interface Utility {
    /**
     * Type of utility available
     */
    type?: UtilityType;
    /**
     * Description of utility available
     */
    description?: string;
}