import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './list/list.component';
import { EventsComponent } from './events.component';

const routes: Routes = [{
  path: '',
  component: EventsComponent,
  children: [
    {
      pathMatch: 'full',
      path: '',
      component: EventsListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule { }

export const routedComponents = [
  EventsComponent,
  EventsListComponent,
];
