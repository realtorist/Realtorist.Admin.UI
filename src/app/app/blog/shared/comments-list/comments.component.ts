import { Component, Input, OnInit } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { ConfirmDeleteDialogComponent } from "../../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { CommentsAdditionalActionComponent } from "./additionalAction.component";
import { CommentMessageComponent } from "./commentMessage.component";
import { Comment } from "../../../../@core/models/blog/comment";
import { IDataSourceProvider } from "../../../../@core/abstractions/dataSourceProvider";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { PostLinkComponent } from "./postLink.component";

@Component({
  selector: "ngx-blog-comments-list",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsListComponent implements OnInit {
  @Input() postId: string;
  
  settings = {};
  source: DataSource;

  constructor(
    private dataSourceProvider: IDataSourceProvider,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private readonly api: IBlogApi
  ) {
  }

  ngOnInit(): void {

    this.source = this.dataSourceProvider.getDataSourceForTable(`blog/${this.postId ? `posts/${this.postId}/`: ''}comments`);
    
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
        name: {
          title: "Name",
          type: "string",
        },
        email: {
          title: "Email",
          type: "string",
        },
        date: {
          title: "Publish date",
          type: "text",
          sortDirection: 'desc',
          valuePrepareFunction: function (cell: moment.Moment, row) {
            return cell.format("dddd, MMMM Do YYYY, h:mm:ss a");
          },
        },
        postTitle: {
          title: "Post",
          type: "custom",
          renderComponent: PostLinkComponent,
        },
        message: {
          title: "Message",
          type: "custom",
          renderComponent: CommentMessageComponent,
        },
        id: {
          title: "Actions",
          type: "custom",
          sort: false,
          renderComponent: CommentsAdditionalActionComponent,
          onComponentInitFunction(instance) {
            instance.delete.subscribe((row) => {
              self.onDelete(row);
            });
          },
        },
      },
    };
  }

  refresh(): void {
    this.source.refresh();
  }

  onDelete(comment: Comment): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        context: {
          text: `comment from ${comment.name}`,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.api.deleteComment(comment.postId, comment.id).subscribe((_) => {
            this.toastrService.success(
              `Comment from ${comment.name} was deleted`,
              "Blog post comment deleted"
            );

            this.source.refresh();
          });
        }
      });
  }
}
