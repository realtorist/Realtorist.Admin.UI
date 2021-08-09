import { APP_BASE_HREF } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import {
  NbDialogService,
  NbTagComponent,
  NbTagInputAddEvent,
  NbToastrService,
} from "@nebular/theme";
import * as CodeMirror from 'codemirror';
import { DragulaService } from 'ng2-dragula';
import { Observable } from "rxjs";
import { ConfirmDeleteDialogComponent } from '../../../@common/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmDialogComponent } from '../../../@common/components/confirm-dialog/confirm-dialog.component';
import { stringToSlug } from "../../../@common/helpers/slug";
import { IPagesApi } from "../../../@core/abstractions/pages.api";
import { Page } from "../../../@core/models/pages/page";
import { PageComponent, PageComponentsTypes, PageComponentsTypesLabels } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-page-edit-form",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class PageEditFormComponent implements OnInit, OnDestroy {
  @ViewChild('CssCodeMirror', { static: false }) cssCodeMirror: CodemirrorComponent;
  
  @Input("page") page$: Observable<Page>;
  @Input() isEdit: boolean;

  page: Page;

  pageTitle: string;

  loading = false;

  autoGenerateLink = true;
  confirmedLinkChange = false;

  pageComponentsTypes = PageComponentsTypes;
  pageComponentsTypesLabels = PageComponentsTypesLabels;

  oldLink: string = '';
  isLinkUsed: boolean = false;

  availableComponents: PageComponent[] = Object.keys(PageComponentsTypes)
    .map(key => ({
      type: key,
      values: {}
    }));

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private toastrService: NbToastrService,
    private dragulaService: DragulaService,
    private dialogService: NbDialogService,
    private readonly api: IPagesApi
  ) {}

  ngOnInit(): void {
    this.autoGenerateLink = !this.isEdit;
    this.page$.subscribe((page) => {
      this.page = page;
      this.pageTitle = this.page?.title;
      this.oldLink = this.page?.link;

      this.page.components = this.page.components || [];
    });

    this.dragulaService.createGroup('PageComponets', {
      copy: (el, source) => {
        return source.id === 'left';
      },
      copyItem: (component: PageComponent) => {
        return {
          type: component.type,
          values: {}
        };
      },
      moves: (el, container, handle) => {
        return handle.className && handle.className.indexOf('handle') >= 0;
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      }
    });

    setTimeout(() => {
      if (this.cssCodeMirror) {
        this.cssCodeMirror.codeMirror.refresh();
        this.cssCodeMirror.codeMirror.on("keyup", function (cm, event) {
          if (!cm.state.completionActive
            && /^[a-zA-Z0-9_\-@:]$/gi.test(event.key)) {
            CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
          }
        });
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('PageComponets');
  }

  removePageComponent(component: PageComponent) {
    this.page.components.splice(this.page.components.indexOf(component), 1);
  }

  onTitleChange(value: string) {
    if (!this.autoGenerateLink) return;
    this.page.link = stringToSlug(value);
    this.onLinkChange();
  }

  onKeywordRemove(tagToRemove: NbTagComponent): void {
    const index = this.page.keywords.indexOf(tagToRemove.text);
    if (index >= 0) {
      this.page.keywords.splice(index, 1);
    }
  }

  onLinkChange(): void {
    if (!this.isEdit || this.confirmedLinkChange) {
      this.oldLink = this.page.link;
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
      if (result)
      {
        this.confirmedLinkChange = true;
        this.oldLink = this.page.link;
        this.checkLink();
      } else {
        this.page.link = this.oldLink;
      }
    })
  }

  onKeywordAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.page.keywords.push(value);
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
      this.api.updatePage(this.page.id, this.page).subscribe((res) => {
        this.loading = false;
        this.pageTitle = this.page.title;
        this.toastrService.success(
          `Page '${this.page.title}' was successfully saved`,
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
      this.api.addPage(this.page).subscribe((id) => {
        this.loading = false;
        this.pageTitle = this.page.title;
        this.page.id = id;
        this.isEdit = true;
        window.history.replaceState({}, '',`${this.baseHref}/app/pages/${id}/edit`.replace('//', '/'));
        this.toastrService.success(
          `Page '${this.page.title}' was successfully created`,
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
    this.api.isLinkInUse(this.page.link, this.page.id ? [this.page.id] : [])
      .subscribe(result => {
        this.isLinkUsed = result;
        return result;
      })
  }
}
