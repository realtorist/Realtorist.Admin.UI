import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IListingsApi } from '../../../@core/abstractions/listings.api';
import { Listing } from '../../../@core/models/listings/listing';

@Component({
  selector: "ngx-listing-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class ListingEditComponent implements OnInit {
  listing$: Observable<Listing>;
  constructor(private route: ActivatedRoute, private readonly api: IListingsApi) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.listing$ = this.api.getListing(id).pipe(
      map((listing) => {
        return listing;
      })
    );
  }
}
