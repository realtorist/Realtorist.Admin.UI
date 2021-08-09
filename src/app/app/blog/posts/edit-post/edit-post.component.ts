import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NbDialogService,
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from '../../../../@common/components/confirm-dialog/confirm-dialog.component';
import { stringToSlug } from "../../../../@common/helpers/slug";
import { IBlogApi } from "../../../../@core/abstractions/blog.api";
import { Post } from "../../../../@core/models/blog/post";

@Component({
  selector: "ngx-post-edit-form",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class PostEditFormComponent implements OnInit {
  @Input("post") post$: Observable<Post>;
  @Input() isEdit: boolean;

  post: Post;

  postTitle: string;

  loading = false;

  categories$: Observable<string[]>;
  tags$: Observable<string[]>;

  autoGenerateLink = true;
  oldLink: string = '';
  confirmedLinkChange = false;

  isLinkUsed: boolean = false;

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private toastrService: NbToastrService,
    private readonly dialogService: NbDialogService,
    private readonly api: IBlogApi
  ) {}

  ngOnInit(): void {
    this.autoGenerateLink = !this.isEdit;
    this.post$.subscribe((post) => {
      this.post = post;
      this.postTitle = this.post?.title;
      this.oldLink = this.post?.link;
    });

    this.categories$ = this.api.getCategories();
    this.tags$ = this.api.getTags();
  }

  onTitleChange(value: string) {
    if (!this.autoGenerateLink) return;
    this.post.link = stringToSlug(value);
    this.onLinkChange();
  }

  onLinkChange(): void {
    if (!this.isEdit || this.confirmedLinkChange) {
      this.oldLink = this.post.link;
      this.checkLink();
      return;
    };

    var dialog = this.dialogService.open(ConfirmDialogComponent, {
      context: {
        text: 'If page\'s link is changed, your existing links to this page will stop working. Are you sure you want to continue?',
        title: 'Link change',
        okButtonText: 'Yes, I\'m sure'
      }
    });
    dialog.onClose.subscribe(result => {
      if (result) {
        this.confirmedLinkChange = true;
        this.oldLink = this.post.link;
        this.checkLink();
      } else {
        this.post.link = this.oldLink;
      }
    })
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    const index = this.post.tags.indexOf(tagToRemove.text);
    if (index >= 0) {
      this.post.tags.splice(index, 1);
    }
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.post.tags.push(value);
    }
    input.nativeElement.value = "";
    input.nativeElement.focus();
  }

  getFilteredOptions(options: string[], currentValue: string) {
    if (!currentValue) return options;

    return (options || []).filter(
      (option) =>
        option.toLocaleLowerCase().indexOf(currentValue.toLocaleLowerCase()) >=
        0
    );
  }

  publish(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    if (this.isEdit) {
      this.api.updatePost(this.post.id, this.post).subscribe((res) => {
        this.loading = false;
        this.postTitle = this.post.title;
        this.toastrService.success(
          `Post '${this.post.title}' was successfully saved`,
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
      this.api.addPost(this.post).subscribe((id) => {
        this.loading = false;
        this.postTitle = this.post.title;
        this.post.id = id;
        this.isEdit = true;
        window.history.replaceState({}, '',`${this.baseHref}/app/blog/posts/${id}/edit`.replace('//', '/'));
        this.toastrService.success(
          `Post '${this.post.title}' was successfully created`,
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

  private checkLink(): void {
    this.api.isLinkInUse(this.post.link, this.post.id ? [this.post.id] : [])
      .subscribe(result => {
        this.isLinkUsed = result;
        return result;
      })
  }
}
