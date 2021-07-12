import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPagesApi } from "../../../@core/abstractions/pages.api";
import { Page } from "../../../@core/models/pages/page";

@Component({
  selector: "ngx-page-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class PageEditComponent implements OnInit {
  page$: Observable<Page>;
  constructor(private route: ActivatedRoute, private readonly api: IPagesApi) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.page$ = this.api.getPage(id).pipe(
      map((page) => {
        page.id = id;
        return page;
      })
    );
  }
}
