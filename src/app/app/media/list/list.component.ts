import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { MediaGalleryComponent } from "../../../@common/components/media/media-gallery/media-gallery.component";
import { MediaPreviewDialogComponent } from "../../../@common/components/media/media-preview-dialog/media-preview-dialog.component";
import { IMediaApi } from "../../../@core/abstractions/media.api";
import { MediaFile } from "../../../@core/models/media/mediaFile";

@Component({
  selector: "ngx-media-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class MediaListComponent implements AfterViewInit {
  @ViewChild(MediaGalleryComponent) gallery!: MediaGalleryComponent;

  loading = false;

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IMediaApi
  ) {}

  ngAfterViewInit(): void {}

  onFilesUploaded(value: MediaFile[]) {
    if (value.length > 0) {
      this.toastrService.success(
        `File ${value[0].name} was successfully uploaded!`,
        "File uploaded"
      );
      this.gallery.refresh(true);
    }
  }

  onMediaSelected(media: MediaFile) {
    this.dialogService
      .open(MediaPreviewDialogComponent, {
        context: {
          canDelete: true,
          media: media,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deleteFile(media.id).subscribe((result) => {
            this.toastrService.success(
              `File ${media.name} was successfully deleted!`,
              "File deleted"
            );
            this.gallery.refresh(true);
          });
        }
      });
  }
}
