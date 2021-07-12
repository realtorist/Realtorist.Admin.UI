import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "@iplab/ngx-file-upload";
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbTimepickerModule, NbToggleModule } from "@nebular/theme";
import { NgxPaginationModule } from "ngx-pagination";
import { ThemeModule } from "../../@theme/theme.module";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { MediaSelectDialogComponent } from "./media/media-select-dialog/media-select-dialog.component";
import { MediaGalleryComponent } from "./media/media-gallery/media-gallery.component";
import { MediaUploadComponent } from "./media/media-upload/media-upload.component";
import { MediaPreviewDialogComponent } from "./media/media-preview-dialog/media-preview-dialog.component";
import { NgxFilesizeModule } from "ngx-filesize";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NumberCellEditComponent } from './table/numberCellEditComponent';
import { PipesModule } from '../pipes/pipes.module';
import { EnumRenderComponent } from './table/enumRenderComponent.component';
import { NgxMaskModule } from 'ngx-mask';
import { PhotoCellEditComponent } from './table/photoCellEditComponent';
import { DirectivesModule } from '../directives/directives.module';
import { PhotoCellRenderComponent } from './table/photoCellRenderComponent';
import { ColorPickerModule } from 'ngx-color-picker';
import { OrderAdditionalActionComponent } from './table/orderAdditionalAction.component';
import { EmptyCellEditComponent } from './table/emptyCellEditorComponent';
import { ImagePreloader } from './media/image-preloader.directive';
import { TimeCellRenderComponent } from './table/timeCellRenderComponent';
import { TimeCellEditComponent } from './table/timeCellEditComponent';
import { NbMomentDateModule } from '@nebular/moment';

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
    PhotoCellEditComponent,
    PhotoCellRenderComponent,
    EmptyCellEditComponent,
    EnumRenderComponent,
    OrderAdditionalActionComponent,
    ImagePreloader,
  ],
  declarations: [
    ConfirmDeleteDialogComponent,
    MediaSelectDialogComponent,
    MediaGalleryComponent,
    MediaUploadComponent,
    MediaPreviewDialogComponent,
    NumberCellEditComponent,
    PhotoCellEditComponent,
    PhotoCellRenderComponent,
    EmptyCellEditComponent,
    TimeCellRenderComponent,
    TimeCellEditComponent,
    EnumRenderComponent,
    OrderAdditionalActionComponent,
    ImagePreloader,
  ],
})
export class CommonComponentsModule {}
