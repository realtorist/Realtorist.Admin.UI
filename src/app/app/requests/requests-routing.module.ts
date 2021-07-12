import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsComponent } from './requests.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [{
  path: '',
  component: RequestsComponent,
  children: [
    {
      path: ':id',
      component: DetailsComponent,
    },
    {
      pathMatch: 'full',
      path: '',
      component: ListComponent,
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
export class RequestsRoutingModule { }

export const routedComponents = [
  RequestsComponent,
  ListComponent,
  DetailsComponent
];
