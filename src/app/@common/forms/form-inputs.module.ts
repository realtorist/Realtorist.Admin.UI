import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "@iplab/ngx-file-upload";
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbToggleModule } from "@nebular/theme";
import { NgxPaginationModule } from "ngx-pagination";
import { ThemeModule } from "../../@theme/theme.module";
import { NgxFilesizeModule } from "ngx-filesize";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NumericInputComponent, NumericInputFormGroupComponent } from './numeric-input/numeric-input.component';
import { EnumSelectComponent, EnumSelectFormGroupComponent } from './select-enum/enum-select.component';
import { PipesModule } from '../pipes/pipes.module';
import { MeasurementInputComponent, MeasurementInputFormGroupComponent } from './measurement/measurement.component';
import { StringInputComponent, StringInputFormGroupComponent } from './string-input/string-input.component';
import { NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from '../directives/directives.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerInputComponent, ColorPickerInputFormGroupComponent } from './color-picker-input/color-picker-input.component';
import { ImageSelectInputComponent, ImageSelectInputFormGroupComponent } from './image-select-input/image-select-input.component';
import { StringTextAreaComponent, StringTextAreaFormGroupComponent } from './string-textarea/string-textarea.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    NbSelectModule,
    NbToggleModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbDialogModule.forChild(),
    NgxPaginationModule,
    NbSpinnerModule,
    FormsModule,
    NgxFilesizeModule,
    ColorPickerModule,
    FileUploadModule,
    NgxMaskModule.forChild(),
    PipesModule,
    DirectivesModule
  ],
  exports: [
    NumericInputComponent,
    NumericInputFormGroupComponent,
    StringInputComponent,
    ColorPickerInputComponent,
    ColorPickerInputFormGroupComponent,
    ImageSelectInputComponent,
    ImageSelectInputFormGroupComponent,
    StringInputFormGroupComponent,
    StringTextAreaComponent,
    StringTextAreaFormGroupComponent,
    EnumSelectComponent,
    EnumSelectFormGroupComponent,
    MeasurementInputComponent,
    MeasurementInputFormGroupComponent,
  ],
  declarations: [
    NumericInputComponent,
    NumericInputFormGroupComponent,
    StringInputComponent,
    StringInputFormGroupComponent,
    StringTextAreaComponent,
    StringTextAreaFormGroupComponent,
    ColorPickerInputComponent,
    ColorPickerInputFormGroupComponent,
    ImageSelectInputComponent,
    ImageSelectInputFormGroupComponent,
    EnumSelectComponent,
    EnumSelectFormGroupComponent,
    MeasurementInputComponent,
    MeasurementInputFormGroupComponent,
  ],
})
export class FormInputsModule {}
