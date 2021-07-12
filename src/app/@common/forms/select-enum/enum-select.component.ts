import { Component, Input, OnInit } from "@angular/core";
import { EnumDisplayMap } from '../../../@core/models/enumDisplayMap';

@Component({
  selector: "ngx-enum-select",
  templateUrl: "./enum-select.component.html",
  styleUrls: ["./enum-select.component.scss"],
})
export class EnumSelectComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() enum: string;
  @Input() multiple?: boolean;
  @Input() required?: boolean;

  enumDisplayMap = EnumDisplayMap;

  ngOnInit(): void {
    this.multiple = this.multiple !== undefined && this.multiple !== false;
    this.required = this.required !== undefined && this.required !== false;
  }
}

@Component({
  selector: "ngx-enum-select-form-group",
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-enum-select [parent]="parent" [property]="property" [required]="required" [enum]="enum" [multiple]="multiple"></ngx-enum-select></div>',
})
export class EnumSelectFormGroupComponent extends EnumSelectComponent implements OnInit {
  @Input() title: string;

  ngOnInit(): void {
    super.ngOnInit();
  }
}
