import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "@iplab/ngx-file-upload";
import { NbAccordionModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbTimepickerModule, NbToggleModule } from "@nebular/theme";
import { NgxPaginationModule } from "ngx-pagination";
import { ThemeModule } from "../../@theme/theme.module";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { MediaSelectDialogComponent } from "./media/media-select-dialog/media-select-dialog.component";
import { MediaGalleryComponent } from "./media/media-gallery/media-gallery.component";
import { MediaUploadComponent } from "./media/media-upload/media-upload.component";
import { MediaPreviewDialogComponent } from "./media/media-preview-dialog/media-preview-dialog.component";
import { NgxFilesizeModule } from "ngx-filesize";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NumberCellEditComponent } from './table/numberCellEditComponent.component';
import { PipesModule } from '../pipes/pipes.module';
import { EnumRenderComponent } from './table/enumRenderComponent.component';
import { NgxMaskModule } from 'ngx-mask';
import { PhotoCellEditComponent } from './table/photoCellEditComponent.component';
import { DirectivesModule } from '../directives/directives.module';
import { PhotoCellRenderComponent } from './table/photoCellRenderComponent.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { OrderAdditionalActionComponent } from './table/orderAdditionalAction.component';
import { EmptyCellEditComponent } from './table/emptyCellEditorComponent.component';
import { ImagePreloader } from './media/image-preloader.directive';
import { TimeCellRenderComponent } from './table/timeCellRenderComponent.component';
import { TimeCellEditComponent } from './table/timeCellEditComponent.component';
import { NbMomentDateModule } from '@nebular/moment';
import { LargeAccordionMessageComponent } from './table/largeAccordionMessage.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CronEditorComponent } from './table/cronEditorComponent.component';
import { CronRenderComponent } from './table/cronRenderComponent.component';
import { CronEditDialogComponent } from './table/cron-edit-dialog/cron-edit-dialog.component';
import { CronJobsModule } from 'ngx-cron-jobs';
import { PasswordCellEditComponent } from './table/passwordCellEditComponent.component';
import { SelectFilterWithNullOptionComponent } from './table/selectFilterWithNullOptionComponent.component';
import { PasswordRenderComponent } from './table/passwordRenderComponent.component';

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
    NbTimepickerModule,
    NbMomentDateModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    CronJobsModule,
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
    ConfirmDeleteDialogComponent,
    MediaSelectDialogComponent,
    MediaGalleryComponent,
    MediaUploadComponent,
    MediaPreviewDialogComponent,
    NumberCellEditComponent,
    PasswordCellEditComponent,
    PasswordRenderComponent,
    PhotoCellEditComponent,
    PhotoCellRenderComponent,
    EmptyCellEditComponent,
    EnumRenderComponent,
    OrderAdditionalActionComponent,
    ImagePreloader,
    SelectFilterWithNullOptionComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    ConfirmDeleteDialogComponent,
    MediaSelectDialogComponent,
    MediaGalleryComponent,
    MediaUploadComponent,
    MediaPreviewDialogComponent,
    NumberCellEditComponent,
    PasswordCellEditComponent,
    PasswordRenderComponent,
    PhotoCellEditComponent,
    PhotoCellRenderComponent,
    EmptyCellEditComponent,
    TimeCellRenderComponent,
    TimeCellEditComponent,
    CronEditorComponent,
    CronRenderComponent,
    CronEditDialogComponent,
    EnumRenderComponent,
    LargeAccordionMessageComponent,
    OrderAdditionalActionComponent,
    ImagePreloader,
    SelectFilterWithNullOptionComponent,
  ],
})
export class CommonComponentsModule {}
