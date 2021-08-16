import { MeasureUnit } from "../lookups/measureUnit";

export interface Measurement {
    unit: MeasureUnit,
    value?: number;
}