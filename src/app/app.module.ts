/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbTimepickerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { ServicesModule } from './@common/services/services.module';
import { NbMomentDateModule } from '@nebular/moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { DragulaModule } from 'ng2-dragula';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './@store/effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './@store/reducers/user.reducer';
import { AppStore } from './@store/appStore';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { NbAuthModule, NbAuthSimpleInterceptor, NbPasswordAuthStrategy } from '@nebular/auth';
import { apiServerUrl } from './@core/implementations/serverUrl';
import { environment } from '../environments/environment';
import { DateTimeHttpInterceptor } from './@common/services/http/dateTimeHttpInterceptor';
import { UnauthorizedHttpInterceptor } from './@common/services/http/unauthorizedHttpInterceptor';
import { WebsiteEffects } from './@store/effects/website.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            key: 'token'
          },
          errors: {
            key: 'errors'
          },
          baseEndpoint: environment.externalApi ?? '',
          login: {
            endpoint: '/api/admin/auth/login',            
          },
          logout: {
            redirect: {
              success: '/auth/login',
              failure: '/auth/login'
            },
          },
          requestPass: {
            endpoint: '/api/admin/auth/request-password'
          },
          resetPass: {
            endpoint: '/api/admin/auth/reset-password',
            method:  'POST'
          },
          register: false,
          validation: {
            password: {
              minLength: 6
            }
          }
        }),
      ],
      forms: {
        login: {
          socialLinks: [],
          strategy: 'email',
          register: false,
          showMessages: {
            error: true,
          },
        },
        logout: {
          redirectDelay: 0,
          strategy: 'email',
          redirect: '/auth/login',
        },
        requestPass: {
          redirectDelay: 5000,
          strategy: 'email',
          showMessages: {
            error: true,
          },
        }
      },
    }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbMomentDateModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxPaginationModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgxMaskModule.forRoot(),
    DragulaModule.forRoot(),
    ServicesModule,
    EffectsModule.forRoot([UserEffects, WebsiteEffects]),
    StoreModule.forRoot(AppStore)
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateTimeHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthSimpleInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedHttpInterceptor,
      multi: true,
    },
  ]
})
export class AppModule {
}
