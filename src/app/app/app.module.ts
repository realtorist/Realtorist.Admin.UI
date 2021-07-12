import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    AppComponent,
  ],
})
export class AppModule {
}
