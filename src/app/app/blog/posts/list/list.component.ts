import { AfterViewInit, Component } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { environment } from "../../../../../environments/environment";
import { ConfirmDeleteDialogComponent } from "../../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { IDataSourceProvider } from "../../../../@core/abstractions/dataSourceProvider";
import { apiServerUrl } from '../../../../@core/implementations/serverUrl';
import { PostListModel } from "../../../../@core/models/blog/postListModel";
import { PostsAdditionalActionComponent } from "./additionalAction.component";
import { CommentLinkComponent } from "./commentLink";

@Component({
  selector: "ngx-blog-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements AfterViewInit {
  settings = {};

  source: DataSource;

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IBlogApi
  ) {
    this.source = this.dataSourceProvider.getDataSourceForTable('blog/posts');
    
    const self = this;
    this.settings = {
      mode: "external",
      hideSubHeader: true,
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
      },
      columns: {
        title: {
          title: "Title",
          type: "html",
          valuePrepareFunction: (cell, row) => `<a target="_blank" href="${apiServerUrl()}/blog/${row.link}">${row.title}</a>`,
        },
        subTitle: {
          title: "Sub title",
          type: "string",
        },
        category: {
          title: "Category",
          type: "string",
        },
        publishDate: {
          title: "Publish date",
          type: "text",
          sortDirection: 'desc',
          valuePrepareFunction: function (cell: moment.Moment, row) {
            return cell.format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
        },
        commentsCount: {
          title: "Comments",
          type: "custom",
          renderComponent: CommentLinkComponent
        },
        views: {
          title: "Views",
          type: "string",
        },
        id: {
          title: "Actions",
          type: "custom",
          sort: false,
          renderComponent: PostsAdditionalActionComponent,
          onComponentInitFunction(instance) {
            instance.delete.subscribe((row) => {
              self.onDelete(row);
            });
          },
        },
      },
    };
  }

  ngAfterViewInit(): void {}

  onDelete(post: PostListModel): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `blog post '${post.title}'`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deletePost(post.id).subscribe((_) => {
            this.toastrService.success(
              `Blog post '${post.title}' was deleted`,
              "Blog post deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
