import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
}