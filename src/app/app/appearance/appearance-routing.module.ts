import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppearanceComponent } from './appearance.component';
import { HomePageSettingsComponent } from './home-page-settings/home-page-settings.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
const routes: Routes = [{
  path: '',
  component: AppearanceComponent,
  children: [
    {
      path: 'theme-settings',
      component: ThemeSettingsComponent,
    },
    {
      path: 'home-page-settings',
      component: HomePageSettingsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppearanceRoutingModule { }

export const routedComponents = [
  AppearanceComponent,
  ThemeSettingsComponent,
  HomePageSettingsComponent
];
