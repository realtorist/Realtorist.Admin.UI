import { Coordinates } from "./coordinates";

export interface Address {
    /**
     * This field returns a formatted street address. It may contain a vertical bar (|) line delimiter if address contains multiple lines.
	 * It includes the following address fields if available: AdditionalStreetInfo,
	 * UnitNumber,
	 * StreetNumber, StreetDirectionPrefix, StreetName, StreetSuffix, StreetDirectionSuffix, BoxNumber,
	 * 
	 * If the above fields do not yield a valid street Address, the following fields will be included instead (if available)
	 * 
	 * AdditionalStreetInfo, UnitNumber, AddressLine1,
	 * AddressLine2
     */
    streetAddress?: string;
    /**
     * The first address line of the address
     */
    addressLine1?: string;
    /**
     * The second address line of the address
     */
    addressLine2?: string;
    /**
     * The building number in the address
     */
    streetNumber?: string;
    /**
     * Directional indicator that precedes the street name
     */
    streetDirectionPrefix?: string;
    /**
     * Official name of the street in the address
     */
    streetName?: string;
    /**
     * The street type
     */
    streetSuffix?: string;
    /**
     * Directional indicator that follows a street name
     */
    streetDirectionSuffix?: string;
    /**
     * Apartment, suite or office number portion of a postal address
     */
    unitNumber?: string;
    /**
     * Post office box if applicable
     */
    boxNumber?: string;
    /**
     * City of the address
     */
    city?: string;
    /**
     * Province of the address
     */
    province?: string;
    /**
     * Postal code of the address
     */
    postalCode?: string;
    /**
     * Country of the address
     */
    country?: string;
    /**
     * Additional information about the street
     */
    additionalStreetInfo?: string;
    /**
     * Community name of the address
     */
    communityName?: string;
    /**
     * Neighbourhood name of the address
     */
    neighbourhood?: string;
    /**
     * Subdivision name of the address
     */
    subdivision?: string;
    /**
     * Latitude coordinates
     */
    coordinates?: Coordinates;
}

/**
 * Gets display string for the address
 * @param address Address
 * @returns Address display string
 */
export const getAddressDisplayString = (address: Address) => `${address.streetAddress}, ${address.city}, ${address.province}, ${address.postalCode}`