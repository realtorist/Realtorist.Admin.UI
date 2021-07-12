import { MeasureUnit } from "../lookups/MeasureUnit";

export interface Measurement {
    unit: MeasureUnit,
    value?: number;
}