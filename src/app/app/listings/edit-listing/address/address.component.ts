import { AfterViewInit, Component, Input } from "@angular/core";
import { Address } from '../../../../@core/models/listings/details/address';
import { Provinces } from '../../../../@core/models/listings/enums/provinces';

@Component({
  selector: "ngx-listing-edit-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class ListingEditAddressComponent implements AfterViewInit {
  @Input() address: Address;

  constructor() { }

  get provinces () {
    return Object.values(Provinces);
  }

  ngAfterViewInit(): void {
  }

  onStreetAddresPropertyChange(): void {
    this.address.streetAddress = [
      this.address.additionalStreetInfo,
      this.address.unitNumber,
      this.address.streetNumber,
      this.address.streetDirectionPrefix,
      this.address.streetName,
      this.address.streetSuffix,
      this.address.streetDirectionSuffix,
      this.address.boxNumber
    ]
      .filter(x => !!x)
      .join(' ');
  }
}
