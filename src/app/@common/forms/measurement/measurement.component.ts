import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { EnumDisplayMap } from '../../../@core/models/enumDisplayMap';
import { MeasureUnit } from '../../../@core/models/listings/lookups/measureUnit';
import { Measurement } from '../../../@core/models/listings/units/measurement';

@Component({
  selector: "ngx-measurement-input",
  templateUrl: "./measurement.component.html",
  styleUrls: ["./measurement.component.scss"],
})
export class MeasurementInputComponent implements OnInit, AfterViewInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() required: boolean;

  isEnabled = false;

  enumDisplayMap = EnumDisplayMap;

  get measurement(): Measurement {
    return this.parent[this.property];
  }

  set measurement(value: Measurement) {
    this.parent[this.property] = value;
  }

  ngOnInit(): void {
    this.required = this.required !== undefined;
  }

  ngAfterViewInit(): void {
    if (!!this.measurement) this.isEnabled = true;
  }

  enable(isEnabled) {
    this.measurement = isEnabled ? { value: null, unit: MeasureUnit.square_feet } : null;
  }
}

@Component({
  selector: "ngx-measurement-input-form-group",
  template: '<div class="form-group"><label class="label"> {{ title }}</label><ngx-measurement-input [parent]="parent" [property]="property" [required]="required"></ngx-measurement-input></div>',
})
export class MeasurementInputFormGroupComponent extends MeasurementInputComponent implements OnInit {
  @Input() title: string;

  ngOnInit(): void {
    super.ngOnInit();
  }
}
