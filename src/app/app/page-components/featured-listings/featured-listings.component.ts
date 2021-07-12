import { Component, Input, OnInit } from "@angular/core";
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-featured-listings-page-component",
  templateUrl: "./featured-listings.component.html",
  styleUrls: ["./featured-listings.component.scss"],
})
export class FeautredListingsPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  constructor() {}

  ngOnInit(): void {
    this.component.values.max = this.component.values.max || 6;
  }
}
