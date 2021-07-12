import { AfterViewInit, Component, Input } from "@angular/core";
import { AlternateURL } from '../../../../@core/models/listings/details/alternateURL';

@Component({
  selector: "ngx-listing-edit-alternate-url",
  templateUrl: "./alternateUrl.component.html",
  styleUrls: ["./alternateUrl.component.scss"],
})
export class ListingEditAlternateUrlComponent implements AfterViewInit {
  @Input() alternateUrl: AlternateURL;

  constructor() { }

  ngAfterViewInit(): void {
  }
}
