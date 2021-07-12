import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NbAuthSimpleInterceptor } from '@nebular/auth';
import { DateTimeHttpInterceptor } from "./http/dateTimeHttpInterceptor";

@NgModule({
  providers: [
  ],
  imports: [],
  exports: [],
  declarations: [],
})
export class ServicesModule {}
