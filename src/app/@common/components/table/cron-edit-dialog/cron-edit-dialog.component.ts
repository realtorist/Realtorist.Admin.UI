import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CronJobsConfig } from 'ngx-cron-jobs/src/app/lib/contracts/contracts';

@Component({
  selector: 'ngx-cron-edit-dialog',
  templateUrl: 'cron-edit-dialog.component.html',
  styleUrls: ['cron-edit-dialog.component.scss'],
})
export class CronEditDialogComponent {
  @Input() cron: string;

  cronConfig: CronJobsConfig = {
    multiple: true,
    bootstrap: true
  }
  
  constructor(protected ref: NbDialogRef<CronEditDialogComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  save() {
    this.ref.close(this.cron);
  }
}
