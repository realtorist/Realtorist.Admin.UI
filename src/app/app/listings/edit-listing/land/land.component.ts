import { AfterViewInit, Component, Input } from "@angular/core";
import { EnumDisplayMap } from '../../../../@core/models/enumDisplayMap';
import { Land } from '../../../../@core/models/listings/details/land';

@Component({
  selector: "ngx-listing-edit-land",
  templateUrl: "./land.component.html",
  styleUrls: ["./land.component.scss"],
})
export class ListingEditLandComponent implements AfterViewInit {
  @Input() land: Land;

  enumDisplayMap = EnumDisplayMap;

  constructor() { }

  ngAfterViewInit(): void {
  }
}
