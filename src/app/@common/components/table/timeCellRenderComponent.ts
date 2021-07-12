
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: '{{time}}',
  styles: []
})
export class TimeCellRenderComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  get time() {
    if (!this.value) return '';
    var time = moment.duration(this.value);

    return time.hours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + ':' + time.minutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  constructor() { }

  ngOnInit() {
  }
}