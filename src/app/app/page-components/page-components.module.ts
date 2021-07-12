import { TwoColumnsWithImagePageComponentComponent } from './two-columns-with-image/two-columns-with-image.component';
import { CallToActionPageComponentComponent } from './call-to-action/call-to-action.component';
import { BlogPageComponentComponent } from './blog/blog.component';
import { ContactFormPageComponentComponent } from './contact-form/contact-form.component';
import { FeautredListingsPageComponentComponent } from './featured-listings/featured-listings.component';
import { HomeWorthPageComponentComponent } from './home-worth/home-worth.component';
import { ServicesPageComponentComponent } from './services/services.component';
import { StepsPageComponentComponent } from './steps/steps.component';
import { TestimonialsPageComponentComponent } from './testimonials/testimonials.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NbCardModule, NbIconModule, NbFormFieldModule, NbInputModule, NbTreeGridModule, NbDialogModule, NbCheckboxModule, NbTabsetModule, NbPopoverModule, NbButtonModule, NbButtonGroupModule, NbSelectModule, NbTooltipModule, NbSpinnerModule, NbDatepickerModule, NbTimepickerModule, NbAutocompleteModule, NbAccordionModule, NbAlertModule, NbTagModule, NbToggleModule } from '@nebular/theme';
import { DragulaModule } from 'ng2-dragula';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';
import { FormInputsModule } from '../../@common/forms/form-inputs.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AppearanceRoutingModule } from '../appearance/appearance-routing.module';
import { TwoColumnsPageComponentComponent } from './two-columns/two-columns.component';
import { OneColumnPageComponentComponent } from './one-column/one-column.component';

export const pageComponentsList = [
    TestimonialsPageComponentComponent,
    FeautredListingsPageComponentComponent,
    CallToActionPageComponentComponent,
    TwoColumnsWithImagePageComponentComponent,
    HomeWorthPageComponentComponent,
    BlogPageComponentComponent,
    ContactFormPageComponentComponent,
    StepsPageComponentComponent,
    ServicesPageComponentComponent,
    TwoColumnsPageComponentComponent,
    OneColumnPageComponentComponent
];

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
    ],
    declarations: pageComponentsList,
    exports: pageComponentsList
})
export class PageComponentsModule { }