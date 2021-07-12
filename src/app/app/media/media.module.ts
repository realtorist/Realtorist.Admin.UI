import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';

import { ThemeModule } from '../../@theme/theme.module';
import { MediaRoutingModule, routedComponents } from './media-routing.module';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    MediaRoutingModule,
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
    CommonComponentsModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class MediaModule { }
