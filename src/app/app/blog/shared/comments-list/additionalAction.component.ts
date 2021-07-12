
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ViewCell } from 'ng2-smart-table';
import { environment } from '../../../../../environments/environment';
import { apiServerUrl } from '../../../../@core/implementations/serverUrl';

@Component({
  template: `
    <nb-button-group>
      <a nbButton [href]="serverUrl + '/blog/permalink/' + rowData.postId + '/' + rowData.id" target="_blank" title="View comment"><nb-icon icon="external-link-outline" pack="eva"></nb-icon></a>
      <a nbButton (click)="onDelete()" title="Delete comment"><nb-icon icon="trash-outline" pack="eva"></nb-icon></a>
    </nb-button-group>
  `,
  styles: [
      'a { cursor: pointer; }'
  ]
})
export class CommentsAdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  
  @Output() delete: EventEmitter<any> = new EventEmitter();

  serverUrl = apiServerUrl();

  constructor(private readonly router: Router) {}

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }
}