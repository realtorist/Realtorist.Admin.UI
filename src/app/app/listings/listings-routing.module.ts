import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingAddComponent } from './add/add.component';
import { ListingEditComponent } from './edit/edit.component';
import { ListingsListComponent } from './list/list.component';
import { ListingsComponent } from './listings.component';

const routes: Routes = [{
  path: '',
  component: ListingsComponent,
  children: [
    // {
    //   path: ':id',
    //   component: DetailsComponent,
    // },
    {
      path: 'add',
      component: ListingAddComponent,
    },
    {
      path: ':id/edit',
      component: ListingEditComponent,
    },
    {
      pathMatch: 'full',
      path: '',
      component: ListingsListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule { }

export const routedComponents = [
  ListingsComponent,
  ListingsListComponent,
  ListingAddComponent,
  ListingEditComponent,
];
