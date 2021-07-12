import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <a [routerLink]="'/app/blog/posts/' + rowData.id + '/comments'">{{value}}</a>
  `,
})
export class CommentLinkComponent implements ViewCell, OnInit {
  readonly minLengthForAccordion = 30;

  @Input() value: string;
  @Input() rowData: any;

  constructor(private readonly router: Router) {}

  ngOnInit() {}
}
