import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';
import { FormInputsModule } from '../../@common/forms/form-inputs.module';

import { ThemeModule } from '../../@theme/theme.module';
import { AppearanceRoutingModule, routedComponents } from './appearance-routing.module';
import { MenuItemChildrenRenderComponent } from './theme-settings/menuItemChildrenRenderComponent.component';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { DragulaModule } from 'ng2-dragula';
import { MenuChildrenDialogComponent } from './theme-settings/menu-children-dialog/menu-children-dialog.component';
import { PageComponentsModule } from '../page-components/page-components.module';
import { LinkAutoSuggestEditComponent } from './theme-settings/linkAutoSuggestEditComponent';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ThemeModule,
    AppearanceRoutingModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
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
    CommonComponentsModule,
    FormInputsModule,
    PageComponentsModule
  ],
  declarations: [
    ...routedComponents,
    MenuItemChildrenRenderComponent,
    MenuChildrenDialogComponent,
    LinkAutoSuggestEditComponent
  ],
})
export class AppearanceModule { }
