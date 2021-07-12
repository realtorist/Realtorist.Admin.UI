import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent as PostsListComponent } from './posts/list/list.component';
import { BlogComponent } from './blog.component';
import { PostCommentsComponent } from './posts/comments/comments.component';
import { AllCommentsListComponent } from './comments/list/list.component';
import { PostEditFormComponent } from './posts/edit-post/edit-post.component';
import { PostEditComponent } from './posts/edit/edit.component';
import { PostAddComponent } from './posts/add/add.component';

const routes: Routes = [{
  path: '',
  component: BlogComponent,
  children: [
    // {
    //   path: ':id',
    //   component: DetailsComponent,
    // },
    {
      path: 'posts',
      component: PostsListComponent,
    },
    {
      path: 'comments',
      component: AllCommentsListComponent,
    },
    {
      path: 'posts/add',
      component: PostAddComponent,
    },
    {
      path: 'posts/:id/edit',
      component: PostEditComponent,
    },
    {
      path: 'posts/:id/comments',
      component: PostCommentsComponent,
    },
    {
      pathMatch: 'full',
      path: '',
      redirectTo: 'posts',
      component: PostsListComponent,
    },
    // {
    //   path: 'tree-grid',
    //   component: TreeGridComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }

export const routedComponents = [
  BlogComponent,
  PostsListComponent,
  PostEditComponent,
  PostAddComponent,
  PostCommentsComponent,
  AllCommentsListComponent
];
