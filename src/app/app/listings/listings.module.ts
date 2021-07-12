import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { DragulaModule } from 'ng2-dragula';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMaskModule } from 'ngx-mask';
import { CommonComponentsModule } from '../../@common/components/components.module';
import { DirectivesModule } from '../../@common/directives/directives.module';
import { FormInputsModule } from '../../@common/forms/form-inputs.module';
import { PipesModule } from '../../@common/pipes/pipes.module';

import { ThemeModule } from '../../@theme/theme.module';
import { ListingEditAddressComponent } from './edit-listing/address/address.component';
import { ListingEditAlternateUrlComponent } from './edit-listing/alternateUrl/alternateUrl.component';
import { ListingEditaBuildingComponent } from './edit-listing/building/building.component';
import { ListingEditFormComponent } from './edit-listing/edit-listing.component';
import { ListingEditLandComponent } from './edit-listing/land/land.component';
import { ListingEditParkingComponent } from './edit-listing/parking/parking.component';
import { ListingEditPhotosComponent } from './edit-listing/photos/photos.component';
import { ListingsAdditionalActionComponent } from './list/additionalAction.component';
import { ListingsRoutingModule, routedComponents } from './listings-routing.module';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ThemeModule,
    ListingsRoutingModule,
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
    DragulaModule,
    NgxMaskModule,
    DirectivesModule,
    PipesModule,
    CommonComponentsModule,
    FormInputsModule,
  ],
  declarations: [
    ...routedComponents,
    ListingsAdditionalActionComponent,
    ListingEditFormComponent,
    ListingEditPhotosComponent,
    ListingEditParkingComponent,
    ListingEditLandComponent,
    ListingEditAlternateUrlComponent,
    ListingEditaBuildingComponent,
    ListingEditAddressComponent
  ],
})
export class ListingsModule { }
