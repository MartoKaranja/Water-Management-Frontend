import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaterRecords, MeterRecord, Msg, UserRecords, MeterTable, Meter } from '../interfaces/questions.interface';
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

  fetchActiveUsers(): Observable<UserRecords>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/dashboard-users';
    return this.http.get<UserRecords>(apiUrl);

  }

  updateMeterReadings(): Observable<UserRecords>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/update-meter-readings';
    return this.http.get<UserRecords>(apiUrl);

  }

  updateSingleUser(username: string): Observable<Msg>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/update-single-user/${username}`;
    return this.http.get<Msg>(apiUrl);

  }

  fetchAddUsersForm(): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/fetch-user-form-details';
    return this.http.get<any>(apiUrl);

  }

  createUserAccount(userData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/create-user-account';
    return this.http.post(apiUrl, userData);
  }

  createLandlordAccount(userData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/create-landlord-account';
    return this.http.post(apiUrl, userData);
  }

  createUserRecords(userData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/add-user-records';
    return this.http.post(apiUrl, userData);
  }

  createMeterRecord(userData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/add-meter-record';
    return this.http.post(apiUrl, userData);
  }

  fetchSingleUser(username: string): Observable<UserRecords>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/fetch-single-user/${username}`;
    return this.http.get<UserRecords>(apiUrl);

  }

  getMeters(pageSize?: number, pageNumber?: string): Observable<MeterTable> {
    let apiUrl = this.configService.getApiUrl() + `water/meter-records`;
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    console.log(apiUrl)
    console.log('Params:', params);

    return this.http.get<MeterTable>(apiUrl, { params });
  }

  deleteMeterRecord(id: number): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/delete-meter-record';
    return this.http.post<Msg>(apiUrl, {'id' :id});
  }

  updateMeterRecord(id: number, data: Meter): Observable<Msg> {
    console.log(data)


    const apiUrl =  this.configService.getApiUrl() + 'water/update-meter-record/';
    return this.http.put<Msg>(`${apiUrl}${id}/`, data);
  }

}
