
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<a [routerLink]="'/app/blog/posts/' + rowData.postId + '/comments'">{{rowData.postTitle }}</a>`,
})
export class PostLinkComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  

  constructor() {}

  ngOnInit() {
  }
}