import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbToastrService,
} from "@nebular/theme";
import { Observable } from "rxjs";
import { NumberCellEditComponent } from '../../../@common/components/table/numberCellEditComponent.component';
import { IListingsApi } from "../../../@core/abstractions/listings.api";
import { EnumDisplayMap } from "../../../@core/models/enumDisplayMap";
import { getAddressDisplayString } from "../../../@core/models/listings/details/address";
import { Listing } from "../../../@core/models/listings/listing";
import { ParkingType } from '../../../@core/models/listings/lookups/parkingType';

@Component({
  selector: "ngx-listing-edit-form",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ["./edit-listing.component.scss"],
})
export class ListingEditFormComponent implements OnInit {
  @Input("listing") listing$: Observable<Listing>;
  @Input() isEdit: boolean;

  listing: Listing;

  listingAddress: string;

  loading = false;

  enumDisplayMap = EnumDisplayMap;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: IListingsApi
  ) {}

  ngOnInit(): void {
    this.listing$.subscribe((page) => {
      this.listing = page;
      this.listingAddress = getAddressDisplayString(this.listing?.address);
    });
  }

  getFilteredOptions(options: string[], currentValue: string) {
    if (!currentValue) return options;

    return (options || []).filter(
      (option) =>
        option.toLocaleLowerCase().indexOf(currentValue.toLocaleLowerCase()) >=
        0
    );
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    if (this.isEdit) {
      this.api.updateListing(this.listing.id, this.listing).subscribe((res) => {
        this.loading = false;
        this.listingAddress = getAddressDisplayString(this.listing.address);
        this.toastrService.success(
          `Listing '${getAddressDisplayString(
            this.listing.address
          )}' was successfully saved`,
          "Saved!"
        );
      }, (error) => {
        this.loading = false;
        this.toastrService.danger(
          `Something went wrong. Please try again`,
          "Error!"
        );
      });
    } else {
      this.api.addListing(this.listing).subscribe((id) => {
        this.loading = false;
        this.listingAddress = getAddressDisplayString(this.listing.address);
        this.listing.id = id;
        this.isEdit = true;
        window.history.replaceState({}, "", `/app/listings/${id}/edit`);
        this.toastrService.success(
          `Listing '${getAddressDisplayString(
            this.listing.address
          )}' was successfully created`,
          "Saved!"
        );
      }, (error) => {
        this.loading = false;
        this.toastrService.danger(
          `Something went wrong. Please try again`,
          "Error!"
        );
      });
    }
  }
}
