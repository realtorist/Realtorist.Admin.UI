import { MaintenanceFeeType } from "../lookups/maintenanceFeeType";
import { PaymentUnit } from "../lookups/paymentUnit";

export interface Maintenance {
    fee?: string;
    frequency?: PaymentUnit;
    included?: MaintenanceFeeType[];
}