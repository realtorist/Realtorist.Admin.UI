import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Guid } from 'guid-typescript';

@Component({
  selector: "ngx-string-textarea",
  templateUrl: "./string-textarea.component.html",
  styleUrls: ["./string-textarea.component.scss"],
})
export class StringTextAreaComponent implements OnInit {
  @Input() parent: any;
  @Input() property: string;
  @Input() required?: boolean;
  @Input() editor?: boolean;
  @Input() title: string;
  @Input() rows?: number;

  @Output() onChange?: EventEmitter<string> = new EventEmitter<string>()

  id: string;

  constructor() { }

  ngOnInit(): void {
    this.required = this.required !== undefined && this.required !== false;
    this.editor = this.editor !== undefined && this.editor !== false;

    this.id = this.property + '-' + Guid.create().toString();
  }
}

@Component({
  selector: "ngx-string-textarea-form-group",
  template: '<div class="form-group"><label class="label">{{ title }}</label><ngx-string-textarea [parent]="parent" [editor]="editor" [property]="property" [required]="required" [title]="title" [rows]="rows" (onChange)="onChange.emit($event)"></ngx-string-textarea></div>',
})
export class StringTextAreaFormGroupComponent extends StringTextAreaComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }
}
