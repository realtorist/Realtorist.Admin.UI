import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsSettingsComponent } from './analytics/analytics-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GeoCodingSettingsComponent } from './geocoding/geocoding-setting.component';
import { ListingSourcesSettingsComponent } from './listing-sources/listing-sources-setting.component';
import { ProfileSettingsComponent } from './profile/profile-setting.component';
import { SettingsComponent } from './settings.component';
import { SmtpSettingsComponent } from './smtp/smtp-setting.component';
import { SocialSettingsComponent } from './social/social-setting.component';
import { WebsiteSettingsComponent } from './website/website-setting.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [
    {
      path: 'profile',
      component: ProfileSettingsComponent,
    },
    {
      path: 'website',
      component: WebsiteSettingsComponent,
    },
    {
      path: 'smtp',
      component: SmtpSettingsComponent,
    },
    {
      path: 'geocoding',
      component: GeoCodingSettingsComponent,
    },
    {
      path: 'analytics',
      component: AnalyticsSettingsComponent,
    },
    {
      path: 'social',
      component: SocialSettingsComponent,
    },
    {
      path: 'listing-sources',
      component: ListingSourcesSettingsComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

export const routedComponents = [
  SettingsComponent,
  ProfileSettingsComponent,
  WebsiteSettingsComponent,
  SmtpSettingsComponent,
  GeoCodingSettingsComponent,
  AnalyticsSettingsComponent,
  SocialSettingsComponent,
  ListingSourcesSettingsComponent,
  ChangePasswordComponent
];
