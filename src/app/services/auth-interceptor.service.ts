import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Interceptor code executing")

    /*
    if (!req.headers.has('Authorization')) {
      // Skip the interceptor and return the original request
      console.log("Interceptor code exiting...")
      return next.handle(req);

    }*/

    // Add the authentication token to the request headers
    const authToken = localStorage.getItem('auth_token');
    if (authToken && req.url.indexOf('/login') === -1) { // Check if the auth token is set and the request URL does not contain '/login'
    req = req.clone({
      setHeaders: { Authorization: `Token ${authToken}` ,
      'Access-Control-Allow-Origin': 'computeracademichelp.com'}
    });
  }



    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Response:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {

        if (error.status == 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('username');
          this.router.navigate(['/auth']);
        }

        return throwError(() => error);
      })
    );
  }
}
