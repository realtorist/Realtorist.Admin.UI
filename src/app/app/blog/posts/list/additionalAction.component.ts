
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-button-group>
      <a nbButton (click)="navigateToEdit()" title="Edit post"><nb-icon icon="edit-outline" pack="eva"></nb-icon></a>
      <a nbButton (click)="onDelete()" title="Delete post"><nb-icon icon="trash-outline" pack="eva"></nb-icon></a>
    </nb-button-group>
  `,
  styles: [
      'a { cursor: pointer; }'
  ]
})
export class PostsAdditionalActionComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private readonly router: Router) {}

  ngOnInit() {
  }

  navigateToEdit() {
    this.router.navigate(['/app/blog/posts/', this.rowData.id, 'edit']);
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }
}