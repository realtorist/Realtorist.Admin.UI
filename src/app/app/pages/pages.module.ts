import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { DragulaModule } from 'ng2-dragula';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DirectivesModule } from '../../@common/directives/directives.module';

import { ThemeModule } from '../../@theme/theme.module';
import { PageComponentsModule } from '../page-components/page-components.module';
import { PageEditFormComponent } from './edit-page/edit-page.component';
import { PagesAdditionalActionComponent } from './list/additionalAction.component';
import { PagesRoutingModule, routedComponents } from './pages-routing.module';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ThemeModule,
    PagesRoutingModule,
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
    CodemirrorModule,
    DragulaModule,
    DirectivesModule,
    PageComponentsModule
  ],
  declarations: [
    ...routedComponents,
    PagesAdditionalActionComponent,
    PageEditFormComponent
  ],
})
export class PagesModule { }
