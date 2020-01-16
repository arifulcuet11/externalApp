import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from 'src/app/feature-module/auth/services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  loaderActive = false;
  endPointUrl: string;
  anonymousUrls = [
    'token',
    'signup',
    'role/actives',
    'sendResetPasswordOTP',
    'passwordReset',
    'fileValidator',
    'GCSubmission/findClaim',
    'GCSubmission/add',
    'GCSubmission/document',
    'GCSubmission/otp',
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private storageService: StorageService,
    private authService: AuthService) {
    this.endPointUrl = environment.endPointUrl;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.loaderActive) {
      this.spinner.show();
      this.loaderActive = true;
    }

    if (
      !(request.url.includes('group-doc.json') ||
        request.url.includes('individual-doc.json') ||
        request.url.includes('product-map.json'))
    ) {
      request = request.clone({
        url: this.endPointUrl + request.url
      });

      const token = this.storageService.getItem('access_token');
      if (!token && !this.anonymousUrls.find(x => request.url.includes(x))) {
        this.authService.signoutLocally();
      }

      if (token && !this.anonymousUrls.find(x => request.url.includes(x))) {
        const type_token: string = this.storageService.getItem('token_type') + ' ' + this.storageService.getItem('access_token');
        request = request.clone({ headers: request.headers.set('Authorization', type_token) });
      }
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderActive = true;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("http_Config_catch_error", error);
         if (error.status === 401) {
          this.authService.signoutLocally();
         }
        return throwError(error);
      }),
      finalize(() => {
        this.spinner.hide();
        this.loaderActive = false;
      })
    );
  }
}
