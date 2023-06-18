import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaterRecords, MeterRecord, Msg } from '../interfaces/questions.interface';
import { ConfigService } from './configService';

@Injectable({
  providedIn: 'root'
})
export class WaterService {


  constructor(private http: HttpClient, private configService: ConfigService) { }

  getWaterRecordsSummary(): Observable<WaterRecords> {
    const apiUrl =  this.configService.getApiUrl() + 'water/';
    return this.http.get<WaterRecords>(apiUrl);
  }

  getMetersSummary(): Observable<MeterRecord> {
    const apiUrl =  this.configService.getApiUrl() + 'water/water-user-records';
    return this.http.get<MeterRecord>(apiUrl);
  }

  updateRecords(): Observable<Msg>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/update-records';
    return this.http.get<Msg>(apiUrl);

  }

  fetchActiveUsers(): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/dashboard-users';
    return this.http.get<any>(apiUrl);

  }

  fetchAddUsersForm(): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/add-user-form';
    return this.http.get<any>(apiUrl);

  }

}
