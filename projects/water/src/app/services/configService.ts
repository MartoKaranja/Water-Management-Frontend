import { Injectable } from '@angular/core';
import { environment } from 'projects/water/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public getApiUrl(): string {
    return environment.apiUrl;
  }
}

