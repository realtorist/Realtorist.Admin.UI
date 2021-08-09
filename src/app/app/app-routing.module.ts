import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // },
    {
      path: 'requests',
      loadChildren: () => import('./requests/requests.module')
        .then(m => m.RequestsModule),
    },
    {
      path: 'events',
      loadChildren: () => import('./events/events.module')
        .then(m => m.EventsModule),
    },
    {
      path: 'blog',
      loadChildren: () => import('./blog/blog.module')
        .then(m => m.BlogModule),
    },
    {
      path: 'pages',
      loadChildren: () => import('./pages/pages.module')
        .then(m => m.PagesModule),
    },
    {
      path: 'media',
      loadChildren: () => import('./media/media.module')
        .then(m => m.MediaModule),
    },
    {
      path: 'listings',
      loadChildren: () => import('./listings/listings.module')
        .then(m => m.ListingsModule),
    },
    {
      path: 'appearance',
      loadChildren: () => import('./appearance/appearance.module')
        .then(m => m.AppearanceModule),
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module')
        .then(m => m.SettingsModule),
    },
    {
      path: '',
      redirectTo: 'events',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: '''',
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
