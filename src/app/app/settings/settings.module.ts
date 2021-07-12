import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';
import { FormInputsModule } from '../../@common/forms/form-inputs.module';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, SettingsRoutingModule } from './settings-routing.module';
import { OrderAdditionalActionComponent } from '../../@common/components/table/orderAdditionalAction.component';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ThemeModule,
    SettingsRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbSelectModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbAutocompleteModule,
    NbAccordionModule,
    NbAlertModule,
    NbTagModule,
    NbToggleModule,
    DirectivesModule,
    CommonComponentsModule,
    FormInputsModule,
  ],
  declarations: [
    ...routedComponents
  ],
})
export class SettingsModule { }
