import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { IMediaApi } from "../../../../@core/abstractions/media.api";
import { MediaFile } from "../../../../@core/models/media/mediaFile";

@Component({
  selector: "ngx-media-select-dialog",
  templateUrl: "./media-select-dialog.component.html",
  styleUrls: ["./media-select-dialog.component.scss"],
})
export class MediaSelectDialogComponent implements OnInit {
  @Input() selectedUrl: string;

  uploadedFiles: Array<File> = [];

  loading = false;

  constructor(
    protected ref: NbDialogRef<MediaSelectDialogComponent>,
    private readonly api: IMediaApi
  ) {}

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    if (!!this.selectedUrl) {
      this.ref.close(this.selectedUrl);
    }
  }

  onFilesUploaded(value: MediaFile[]) {
    if (value.length > 0) {
      this.selectedUrl = value[0].url;
      this.submit();
    }
  }

  onMediaSelected(value: MediaFile) {
    this.selectedUrl = value.url;
  }
}
