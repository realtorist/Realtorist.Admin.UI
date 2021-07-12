import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable()
export class DateTimeHttpInterceptor implements HttpInterceptor {
  private utcDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  private localDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)[-+][0-9]{2}:[0-9]{2}$/;
  private localDateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,})?$/;
  private timeSpanRegex = /^(\d{2}):(\d{2})(:(\d{2}))?$/;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convertDates(event.body);
        }
        return event;
      }));
  }

  private convertDates(object: Object) {
    if (!object || !(object instanceof Object)) {
      return;
    }

    if (object instanceof Array) {
      for (const item of object) {
        this.convertDates(item);
      }
    }

    for (const key of Object.keys(object)) {
      const value = object[key];

      if (value instanceof Array) {
        for (const item of value) {
          this.convertDates(item);
        }
      }

      if (value instanceof Object) {
        this.convertDates(value);
      }

      if (typeof value === 'string' && this.utcDateRegex.test(value)) {
        object[key] = moment.utc(value);
      } else if (typeof value === 'string' && (this.localDateRegex.test(value) || this.localDateTimeRegex.test(value))) {
        object[key] = moment(value);
      } 
      // else if (typeof value === 'string' && this.timeSpanRegex.test(value)) {
      //   const duration = moment.duration(value);
      //   object[key] = duration;
      // }
    }
  }
}