import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';


@Injectable()
export class ErrorsHandler implements HttpInterceptor {

  constructor(private authenticationService: AuthService, private route: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            if (error.status === 401) {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
              this.route.navigate(['']);
            }
            if (error.status === 403) {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
              this.route.navigate(['']);
            }
            if (error.status === 404) {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
              this.route.navigate(['']);
            }
            if (error.status === 500) {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
              this.route.navigate(['']);
            }
          }
          console.log(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}