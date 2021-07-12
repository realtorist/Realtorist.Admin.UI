
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-button-group>
      <a nbButton (click)="onDown()" [class.disabled]="arrayWrap[key].indexOf(rowData) === arrayWrap[key].length - 1" title="Move down"><nb-icon icon="arrow-downward-outline" pack="eva"></nb-icon></a>
      <a nbButton (click)="onUp()" [class.disabled]="arrayWrap[key].indexOf(rowData) === 0"  title="Move up"><nb-icon icon="arrow-upward-outline" pack="eva"></nb-icon></a>
    </nb-button-group>
  `,
  styles: [
      'a { cursor: pointer; } a.disabled { cursor: not-allowed; pointer-events: none; }'
  ]
})
export class OrderAdditionalActionComponent<T> implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: T;

  key: string;
  arrayWrap: {};
  
  @Output() up: EventEmitter<T> = new EventEmitter();
  @Output() down: EventEmitter<T> = new EventEmitter();

  constructor(private readonly router: Router) {}

  ngOnInit() {
  }

  setArray(key: string, arrayWrap: {}) {
    this.arrayWrap = arrayWrap;
    this.key = key;
  }

  onUp() {
    this.up.emit(this.rowData);
  }

  onDown() {
    this.down.emit(this.rowData);
  }
}