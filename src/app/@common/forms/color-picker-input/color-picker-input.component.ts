import { ViewContainerRef } from '@angular/core';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "ngx-color-picker-input",
  templateUrl: "./color-picker-input.component.html",
  styleUrls: ["./color-picker-input.component.scss"],
})
export class ColorPickerInputComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() required?: boolean;
  @Input() title: string;

  @Output() onChange?: EventEmitter<string> = new EventEmitter<string>();

  toggle: boolean = false;

  ngOnInit(): void {
    this.required = this.required !== undefined && this.required !== false;
  }
}

@Component({
  selector: "ngx-color-picker-input-form-group",
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-color-picker-input [parent]="parent" [property]="property" [required]="required" [title]="title" (onChange)="onChange.emit($event)"></ngx-color-picker-input></div>',
})
export class ColorPickerInputFormGroupComponent extends ColorPickerInputComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
