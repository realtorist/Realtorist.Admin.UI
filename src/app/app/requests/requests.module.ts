import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';

import { ThemeModule } from '../../@theme/theme.module';
import { CustomerRequestReplyFormComponent } from './details/reply-form/reply-form.component';
import { CustomerRequestReplyComponent } from './details/reply/reply.component';
import { AdditionalActionComponent } from './list/additionalAction.component';
import { RequestsRoutingModule, routedComponents } from './requests-routing.module';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    RequestsRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbCheckboxModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbSelectModule,
    NbSpinnerModule,
    DirectivesModule,
    CommonComponentsModule
  ],
  declarations: [
    ...routedComponents,
    AdditionalActionComponent,
    CustomerRequestReplyComponent,
    CustomerRequestReplyFormComponent
  ],
})
export class RequestsModule { }
