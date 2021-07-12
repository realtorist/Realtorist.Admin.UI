import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class UnauthorizedHttpInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((error: any) => {
        if (this.router.url.indexOf('/auth') !== 0 && error.status === 401) {
          this.router.navigate(['/auth/login']);
        }

        return throwError(error);
      }));
  }
}