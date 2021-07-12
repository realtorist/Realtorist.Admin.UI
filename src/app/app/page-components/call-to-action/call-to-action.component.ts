import { Component, Input, OnInit } from "@angular/core";
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-call-to-action-page-component",
  templateUrl: "./call-to-action.component.html",
  styleUrls: ["./call-to-action.component.scss"],
})
export class CallToActionPageComponentComponent implements OnInit {
  @Input() component: PageComponent;

  constructor() {}

  ngOnInit(): void {
  }
}
