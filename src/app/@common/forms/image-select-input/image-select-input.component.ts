import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "ngx-image-select-input",
  templateUrl: "./image-select-input.component.html",
  styleUrls: ["./image-select-input.component.scss"],
})
export class ImageSelectInputComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() title: string;
  @Input() required?: boolean;

  @Output() onChange?: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.required = this.required !== undefined && this.required !== false;
  }
}

@Component({
  selector: "ngx-image-select-input-form-group",
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-image-select-input [parent]="parent" [property]="property" [required]="required" [title]="title" (onChange)="onChange.emit($event)"></ngx-image-select-input></div>',
})
export class ImageSelectInputFormGroupComponent extends ImageSelectInputComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
