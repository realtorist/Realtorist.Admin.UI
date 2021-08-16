import { UtilityWater } from '../lookups/utilityWater';
import { UtilityPower } from '../lookups/utilityPower';
import { BuildingType } from '../lookups/buildingType';
import { StoreFront } from '../lookups/storeFront';
import { RoofStyle } from '../lookups/roofStyle';
import { RoofMaterial } from '../lookups/roofMaterial';
import { HeatingType } from '../lookups/heatingType';
import { HeatingFuel } from '../lookups/heatingFuel';
import { FoundationType } from '../lookups/foundationType';
import { FlooringType } from '../lookups/flooringType';
import { Fixture } from '../lookups/fixture';
import { FireplaceType } from '../lookups/fireplaceType';
import { FireplaceFuel } from '../lookups/fireplaceFuel';
import { FireProtection } from '../lookups/fireProtection';
import { ExteriorFinish } from '../lookups/exteriorFinish';
import { CoolingType } from '../lookups/coolingType';
import { ConstructionStyleSplitLevel } from '../lookups/constructionStyleSplitLevel';
import { ConstructionStyleOther } from '../lookups/constructionStyleOther';
import { ConstructionStyleAttachment } from '../lookups/constructionStyleAttachment';
import { ConstructionStatus } from '../lookups/constructionStatus';
import { ConstructionMaterial } from '../lookups/constructionMaterial';
import { Measurement } from '../units/measurement';
import { BasementType } from '../lookups/basementType';
import { BasementFeatures } from '../lookups/basementFeatures';
import { BasementDevelopment } from '../lookups/basementDevelopment';
import { ArchitecturalStyle } from '../lookups/architecturalStyle';
import { Appliances } from '../lookups/appliances';
import { Amperage } from '../lookups/amperage';
import { Amenities } from '../lookups/amenities';
import { Room } from './room';
import { PoolType } from '../lookups/poolType';
import { PoolFeatures } from '../lookups/poolFeatures';
import { StorageType } from '../lookups/storageType';
import { Utility } from './utility';
import { ViewType } from '../lookups/viewType';

export interface Building {
    /**
     * Number of bathrooms
     */
    bathroomTotal?: number;
    /**
     * Number of bedrooms above ground
     */
    bedroomsAboveGround?: number;
    /**
     * Number of bedrooms below ground
     */
    bedroomsBelowGround?: number;
    /**
     * Number of bedrooms (below + above ground)
     */
    bedroomsTotal?: number;
    /**
     * The age of the building
     */
    age?: string;
    /**
     * The building amenities
     */
    amenities?: Amenities[];
    /**
     * The appliances included with the building
     */
    appliances?: Appliances[];
    /**
     * Architectural style of the building
     */
    architecturalStyle?: ArchitecturalStyle[];
    /**
     * Development of the basement
     */
    basementDevelopment?: BasementDevelopment[];
    /**
     * Features of the basement
     */
    basementFeatures?: BasementFeatures[];
    /**
     * The type of basement
     */
    basementType?: BasementType[];
    /**
     * Ceiling height of the building
     */
    ceilingHeight?: Measurement;
    /**
     * The year the building was built
     */
    constructedDate?: number;
    /**
     * List of construction materials used in the building
     */
    constructionMaterial?: ConstructionMaterial[];
    /**
     * The status of the building
     */
    constructionStatus?: ConstructionStatus;
    /**
     * The attachment style of the building
     */
    constructionStyleAttachment?: ConstructionStyleAttachment;
    /**
     * Construction style other
     */
    constructionStyleOther?: ConstructionStyleOther;
    /**
     * Construction style split level
     */
    constructionStyleSplitLevel?: ConstructionStyleSplitLevel;
    /**
     * Type of Cooling in the building
     */
    coolingType?: CoolingType[];
    /**
     * The exterior finish of the building
     */
    exteriorFinish?: ExteriorFinish[];
    /**
     * Fire protection and security features of building
     */
    fireProtection?: FireProtection[];
    /**
     * List of fireplace fuels for the fireplaces in building
     */
    fireplaceFuel?: FireplaceFuel[];
    /**
     * Indicates whether there is a fireplace in building
     */
    fireplacePresent?: boolean;
    /**
     * Total number of fireplaces present in building
     */
    fireplaceTotal?: number;
    /**
     * The types of fireplace in the building
     */
    fireplaceType?: FireplaceType[];
    /**
     * Building fixture
     */
    fixture?: Fixture[];
    /**
     * The type of flooring in the building
     */
    flooringType?: FlooringType[];
    /**
     * The type of foundation of the building
     */
    foundationType?: FoundationType[];
    /**
     * The number of half Bathrooms
     */
    halfBathTotal?: number;
    /**
     * Fuel used for heating the building
     */
    heatingFuel?: HeatingFuel[];
    /**
     * The heating type of the building
     */
    heatingType?: HeatingType[];
    /**
     * The date the building was renovated
     */
    renovatedDate?: string;
    /**
     * The type of roofing material of the building
     */
    roofMaterial?: RoofMaterial[];
    /**
     * The roof style of the building
     */
    roofStyle?: RoofStyle[];
    /**
     * Collection of Room
     */
    rooms?: Room[];
    /**
     * The number of stories of the building
     */
    storiesTotal?: number;
    /**
     * Building interior size
     */
    sizeExterior?: Measurement;
    /**
     * Building exterior size
     */
    sizeInterior?: Measurement;
    /**
     * The size of finished interior
     */
    sizeInteriorFinished?: Measurement;
    /**
     * Total finished area
     */
    totalFinishedArea?: Measurement;
    /**
     * Type of Building
     */
    type: BuildingType[];
    /**
     * Type of unit
     */
    unitType?: string;
    /**
     * The types of power in the building
     */
    utilityPower?: UtilityPower[];
    /**
     * Building water type
     */
    utilityWater?: UtilityWater[];
    /**
     * Pool type
     */
    poolType?: PoolType[];
    /**
     * Pool features
     */
    poolFeatures?: PoolFeatures[];
    /**
     * Type of the storage
     */
    storageType?: StorageType[];
    /**
     * Number of buildings in this listing
     */
    totalBuildings?: number;
    /**
     * Utilities avaialble for this building
     */
    utilities?: Utility[];
    /**
     * Type of the view from this building
     */
    viewType?: ViewType[];
}