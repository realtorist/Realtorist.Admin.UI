import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <nb-accordion *ngIf="value && value.length > minLengthForAccordion">
      <nb-accordion-item>
        <nb-accordion-item-header>
          {{ trimValue() }}
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <div [innerHtml]="replaceNewLines()"></div>
        </nb-accordion-item-body>
      </nb-accordion-item>
    </nb-accordion>
    <div *ngIf="!value || value.length <= minLengthForAccordion">
      {{ value }}
    </div>
  `,
})
export class LargeAccordionMessageComponent implements ViewCell, OnInit {
  readonly minLengthForAccordion = 30;

  @Input() value: string;
  @Input() rowData: any;

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  trimValue(): string {
    return this.value && this.value.length > this.minLengthForAccordion
      ? this.value.substr(0, this.minLengthForAccordion) + "..."
      : this.value;
  }

  replaceNewLines(): string {
    return this.value ? this.value.replace(/\n/g, '<br>') : '';
  }
}
