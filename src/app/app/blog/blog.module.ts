import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { NbAccordionModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DirectivesModule } from '../../@common/directives/directives.module';

import { ThemeModule } from '../../@theme/theme.module';
import { BlogRoutingModule, routedComponents } from './blog-routing.module';
import { PostEditFormComponent } from './posts/edit-post/edit-post.component';
import { PostsAdditionalActionComponent } from './posts/list/additionalAction.component';
import { CommentLinkComponent } from './posts/list/commentLink';
import { CommentsAdditionalActionComponent } from './shared/comments-list/additionalAction.component';
import { CommentsListComponent } from './shared/comments-list/comments.component';
import { PostLinkComponent } from './shared/comments-list/postLink.component';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    ThemeModule,
    BlogRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbSelectModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbAutocompleteModule,
    NbAccordionModule,
    NbAlertModule,
    NbTagModule,
    NbToggleModule,
    DirectivesModule
  ],
  declarations: [
    ...routedComponents,
    PostsAdditionalActionComponent,
    CommentsListComponent,
    CommentsAdditionalActionComponent,
    CommentLinkComponent,
    PostLinkComponent,
    PostEditFormComponent
  ],
})
export class BlogModule { }
