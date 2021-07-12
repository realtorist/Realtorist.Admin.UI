import { Component, Input, OnInit } from "@angular/core";
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-home-worth-page-component",
  templateUrl: "./home-worth.component.html",
  styleUrls: ["./home-worth.component.scss"],
})
export class HomeWorthPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  constructor() {}

  ngOnInit(): void {
  }
}
