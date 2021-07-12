import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "ngx-string-input",
  templateUrl: "./string-input.component.html",
  styleUrls: ["./string-input.component.scss"],
})
export class StringInputComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() required?: boolean;
  @Input() pattern?: string;
  @Input() mask?: string;
  @Input() type?: string;
  @Input() title: string;

  @Output() onChange?: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.type = this.type || 'text';
    this.required = this.required !== undefined && this.required !== false;
  }
}

@Component({
  selector: "ngx-string-input-form-group",
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-string-input [parent]="parent" [property]="property" [pattern]="pattern" [type]="type" [mask]="mask" [required]="required" [title]="title" (onChange)="onChange.emit($event)"></ngx-string-input></div>',
})
export class StringInputFormGroupComponent extends StringInputComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
