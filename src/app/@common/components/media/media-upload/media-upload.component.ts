import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IMediaApi } from "../../../../@core/abstractions/media.api";
import { MediaFile } from "../../../../@core/models/media/mediaFile";

@Component({
  selector: "ngx-media-upload",
  templateUrl: "./media-upload.component.html",
  styleUrls: ["./media-upload.component.scss"],
})
export class MediaUploadComponent implements OnInit {
  @Input() loading? = false;
  @Output() filesUploaded: EventEmitter<MediaFile[]> = new EventEmitter<MediaFile[]>();

  uploadedFiles: Array<File> = [];

  constructor(
    private readonly api: IMediaApi
  ) {}

  ngOnInit(): void {
  }

  uploadFileChange(value: File[]) {
    if (value.length > 0) {
      this.loading = true;
      this.api.uploadFile(value)
        .subscribe(result => {
          this.loading = false;
          this.filesUploaded.emit(result);
          this.uploadedFiles = [];
        })
    }
  }
}
