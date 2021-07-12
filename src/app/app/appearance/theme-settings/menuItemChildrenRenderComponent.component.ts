
import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { ViewCell } from 'ng2-smart-table';
import { MenuChildrenDialogComponent } from './menu-children-dialog/menu-children-dialog.component';

@Component({
  template: `<a nbButton ghost (click)="openChildren()">{{rowData.children?.length ?? 0}}</a>`,
  styles: []
})
export class MenuItemChildrenRenderComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  constructor(private dialog: NbDialogService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
  }

  openChildren() {
    const dialog = this.dialog.open(MenuChildrenDialogComponent,
      {
        closeOnBackdropClick: false,
        closeOnEsc: false,
        context: {
          parent: this.rowData
        },
      });
    dialog.onClose.subscribe(_ => {
      //this.rowData.children = this.value.slice();
      this.changeDetector.markForCheck();
    });
  }
}