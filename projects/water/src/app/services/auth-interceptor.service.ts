import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ConfigService } from './configService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Interceptor code executing")


    // Add the authentication token to the request headers
    const authToken = localStorage.getItem('auth_token');
    console.log('Interceptor reading auth token from storage ' + authToken)
    if (authToken && req.url.indexOf('/login') === -1) { // Check if the auth token is set and the request URL does not contain '/login'
    req = req.clone({
      setHeaders: { Authorization: `Token ${authToken}` }
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
          // Remove the auth token and username from local storage

          const authToken = localStorage.getItem('auth_token');

          if (authToken) {
            console.log('Interceptor encountered error 401. Auth token is:' + authToken);

            // Make an HTTP DELETE request to the Django endpoint that deletes the token
            let url = `${this.configService.getApiUrl()}water/delete-token`;
            let body = JSON.stringify({
              'authToken': authToken
            });
            this.http.delete(url, { body, headers: { 'Content-Type': 'application/json' } }).subscribe({
              next: (response: any) => {
                console.log('Token deleted on server');
              },
              error: (error: any) => {
                console.error(error);
              }
            });
          } else {
            console.log('No auth token found in local storage.');
          }


          localStorage.removeItem('auth_token');
          localStorage.removeItem('username');



          // Navigate to the authentication page
          this.router.navigate(['/auth']);
        }

        return throwError(() => error);
      })

    );
  }
}
