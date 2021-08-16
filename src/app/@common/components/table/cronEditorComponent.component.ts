
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import cronstrue from 'cronstrue';
import { DefaultEditor } from 'ng2-smart-table';
import { CronEditDialogComponent } from './cron-edit-dialog/cron-edit-dialog.component';

@Component({
  template: `<a nbButton ghost (click)="openEditor()">{{!!cell.newValue ? expression : 'Not set'}}</a>`,
  styles: []
})
export class CronEditorComponent extends DefaultEditor implements OnInit {
  constructor(private readonly dialogService: NbDialogService) {super();}

  ngOnInit() {
    this.cell.newValue = this.cell.getValue() || null;
  }

  get expression(): string {
    return cronstrue.toString(this.cell.newValue);
  }

  openEditor() {
    this.dialogService.open(CronEditDialogComponent, {
      context: {
        cron: this.cell.newValue ?? ''
      }
    }).onClose.subscribe(result => {
      if (!!result) {
        this.cell.newValue = result;
      }
    });
  }
}