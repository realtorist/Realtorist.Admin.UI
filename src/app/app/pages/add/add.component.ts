import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Page } from "../../../@core/models/pages/page";

@Component({
  selector: "ngx-page-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class PageAddComponent implements OnInit {
  page: Page = {
    id: '',
    link: '',
    title: '',
    keywords: [],
    description: '',
    components: [],
    configuration: {
      header: true,
      footer: true,
      contactForm: false
    },
    unPublished: false
  };

  page$: Observable<Page> = of(this.page);

  constructor() {}

  ngOnInit(): void {}
}
