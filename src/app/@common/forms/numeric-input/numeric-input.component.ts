import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ngx-numeric-input",
  templateUrl: "./numeric-input.component.html",
  styleUrls: ["./numeric-input.component.scss"],
})
export class NumericInputComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() required?: boolean;
  @Input() title: string;
  @Input() suffix: string;
  @Input() prefix: string;

  constructor() { }

  ngOnInit(): void {
    this.required = this.required !== undefined && this.required !== false;
  }
}

@Component({
  selector: "ngx-numeric-input-form-group",
  
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-numeric-input [parent]="parent" [property]="property" [required]="required" [min]="min" [max]="max" [step]="step" [title]="title" [suffix]="suffix" [prefix]="prefix"></ngx-numeric-input></div>',
})
export class NumericInputFormGroupComponent extends NumericInputComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
