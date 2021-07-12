import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAddComponent } from './add/add.component';
import { PageEditComponent } from './edit/edit.component';
import { PagesListComponent } from './list/list.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: ':id',
    //   component: DetailsComponent,
    // },
    {
      path: 'add',
      component: PageAddComponent,
    },
    {
      path: ':id/edit',
      component: PageEditComponent,
    },
    {
      pathMatch: 'full',
      path: '',
      component: PagesListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }

export const routedComponents = [
  PagesComponent,
  PagesListComponent,
  PageAddComponent,
  PageEditComponent
];
