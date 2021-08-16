import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PropertyPhoto } from "../../../../@core/models/listings/details/propertyPhoto";

@Component({
  selector: "ngx-listing-edit-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.scss"],
})
export class ListingEditPhotosComponent implements AfterViewInit {
  @Input() parent: string;
  @Input() property: string;

  @ViewChild("imageUrl") imageUrl: FormControl;
  @ViewChild("description") description: FormControl;

  newPhoto: PropertyPhoto = {
    url: '',
    description: '',
  };

  get photos(): PropertyPhoto[] {
    return this.parent[this.property];
  }

  set photos(value: PropertyPhoto[]) {
    this.parent[this.property] = value;
  }

  constructor() { }

  ngAfterViewInit(): void {
    if (!this.photos) this.photos = [];
    this.resetNewPhoto();
  }

  resetNewPhoto() {
    this.newPhoto = {
      url: '',
      description: '',
    };

    this.imageUrl.reset();
    this.description.reset();
  }

  deletePhoto(photo: PropertyPhoto) {
    this.photos.splice(this.photos.indexOf(photo), 1);
  }

  addPhoto() {
    if (this.imageUrl.invalid) return;
    this.photos.push(this.newPhoto);
    this.resetNewPhoto();
  }
}
