import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaListComponent } from './list/list.component';
import { MediaComponent } from './media.component';


const routes: Routes = [{
  path: '',
  component: MediaComponent,
  children: [
    {
      pathMatch: 'full',
      path: '',
      component: MediaListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule { }

export const routedComponents = [
  MediaComponent,
  MediaListComponent
];
