import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './configService';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = this.configService.getApiUrl() + 'auth/';

  constructor(private http: HttpClient, private configService: ConfigService) { }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      username: username,
      password: password
    };
    return this.http.post<any>(this.apiUrl, body, httpOptions);
  }

  logout() {
    // implement logout functionality
  }
}
