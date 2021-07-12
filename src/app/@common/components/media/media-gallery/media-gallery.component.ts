import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IMediaApi } from "../../../../@core/abstractions/media.api";
import { MediaFile } from "../../../../@core/models/media/mediaFile";

@Component({
  selector: "ngx-media-gallery",
  templateUrl: "./media-gallery.component.html",
  styleUrls: ["./media-gallery.component.scss"],
})
export class MediaGalleryComponent implements OnInit {
  @Input() selectedUrl: string;
  @Input() loading? = false;
  @Output() mediaSelected?: EventEmitter<MediaFile> = new EventEmitter<MediaFile>();

  itemsPerPage = 12;

  medias$: Observable<MediaFile[]>;
  currentPage: number = 1;
  total: number;

  constructor(
    private readonly api: IMediaApi
  ) {}

  ngOnInit(): void {
    this.getPage(1);
  }

  refresh(jumpToFirstPage: boolean = false) {
    this.getPage(jumpToFirstPage ? 1 : this.currentPage);
  }

  getPage(page: number) {
    this.loading = true;
        this.medias$ = this.api.getMedia({ page: page, limit: this.itemsPerPage })
          .pipe(
            tap(res => {
                this.total = res.totalRecords;
                this.currentPage = page;
                this.loading = false;
                if (!res.results.some(media => media.url === this.selectedUrl)) this.selectedUrl = null;
            }),
            map(res => res.results)
        );
  }

  selectMedia(media: MediaFile): void {
    this.selectedUrl = media.url;
    this.mediaSelected.emit(media);
  }
}
