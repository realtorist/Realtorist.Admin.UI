import * as moment from "moment";
import { Address } from "./details/address";
import { PropertyPhoto } from "./details/propertyPhoto";
import { MeasureUnit } from "./lookups/measureUnit";
import { OwnershipType } from "./lookups/ownershipType";
import { PaymentUnit } from "./lookups/paymentUnit";
import { PropertyType } from "./lookups/propertyType";
import { TransactionType } from "./lookups/transactionType";

export interface ListingListModel {
    id: string;
    featured: boolean;
    disabled: boolean;
    feedId: string;
    feedType: string;
    mlsNumber: string;
    lastUpdated: moment.Moment;
    address: Address;
    ownershipType?: OwnershipType;
    photo?: PropertyPhoto[];
    price?: number;
    pricePerTime?: PaymentUnit;
    pricePerUnit?: MeasureUnit;
    propertyType?: PropertyType;
    transactionType?: TransactionType;
}