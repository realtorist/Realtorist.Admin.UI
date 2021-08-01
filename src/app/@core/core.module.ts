import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbAuthSimpleInterceptor, NbDummyAuthStrategy, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ICustomerRequestsApi } from './abstractions/customer-requests.api';
import { CustomerRequestsApi } from './implementations/customer-requests.api';
import { IBlogApi } from './abstractions/blog.api';
import { BlogApi } from './implementations/blog.api';
import { IDataSourceProvider } from './abstractions/dataSourceProvider';
import { DataSourceProvider } from './implementations/dataSourceProvider';
import { IMediaApi } from './abstractions/media.api';
import { MediaApi } from './implementations/media.api';
import { IPagesApi } from './abstractions/pages.api';
import { PagesApi } from './implementations/pages.api';
import { IListingsApi } from './abstractions/listings.api';
import { ListingsApi } from './implementations/listings.api';
import { IUserApi } from './abstractions/user.api';
import { UserApi } from './implementations/user.api';
import { ISettingsApi } from './abstractions/settings.api';
import { SettingsApi } from './implementations/settings.api';
import { AuthGuard } from './auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IEventsApi } from './abstractions/events.api';
import { EventsApi } from './implementations/events.api';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: ICustomerRequestsApi, useClass: CustomerRequestsApi },
  { provide: IBlogApi, useClass: BlogApi },
  { provide: IEventsApi, useClass: EventsApi },
  { provide: IMediaApi, useClass: MediaApi },
  { provide: IPagesApi, useClass: PagesApi },
  { provide: IListingsApi, useClass: ListingsApi },
  { provide: IUserApi, useClass: UserApi },
  { provide: ISettingsApi, useClass: SettingsApi },
  { provide: IDataSourceProvider, useClass: DataSourceProvider },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  AuthGuard,

  { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
