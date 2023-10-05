import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaterRecords, MeterRecord, Msg, UserRecords, MeterTable, Meter, UserRecordsList, UserList, MpesaResult, FormDetails, ConsumptionRecords } from '../interfaces/questions.interface';
import { ConfigService } from './configService';

@Injectable({
  providedIn: 'root'
})
export class WaterService {


  constructor(private http: HttpClient, private configService: ConfigService) { }

  getWaterRecordsSummary(pageSize?: number, pageNumber?: string, query_string?: string): Observable<WaterRecords> {
    let apiUrl =  this.configService.getApiUrl() + 'water/consumption-records/';
    if (query_string)
    {
      apiUrl += query_string;
    }
    if (pageSize && pageNumber) {
      if (query_string)
      {
        apiUrl += `&page_size=${pageSize}&page_number=${pageNumber}`;
      }
      else
      {
        apiUrl += `?page_size=${pageSize}&page_number=${pageNumber}`;
      }

    }
    return this.http.get<WaterRecords>(apiUrl);
  }

  getConsumptionRecordsSummary(pageSize?: number, pageNumber?: string, query_string?: string): Observable<ConsumptionRecords> {
    let apiUrl =  this.configService.getApiUrl() + 'water/consumption-history-records/';
    if (query_string)
    {
      apiUrl += query_string;
    }
    if (pageSize && pageNumber) {
      if (query_string)
      {
        apiUrl += `&page_size=${pageSize}&page_number=${pageNumber}`;
      }
      else
      {
        apiUrl += `?page_size=${pageSize}&page_number=${pageNumber}`;
      }

    }
    return this.http.get<ConsumptionRecords>(apiUrl);
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

  fetchActiveUsers(): Observable<UserRecordsList>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/dashboard-users';
    return this.http.get<UserRecordsList>(apiUrl);

  }

  fetchMpesaAPIDetails(): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/mpesa-api-details';
    return this.http.get<any>(apiUrl);

  }


  updateMeterReadings(): Observable<Msg>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/fetch-consumption-records';
    return this.http.get<Msg>(apiUrl);

  }

  updateSingleUser(username: string): Observable<Msg>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/update-single-user/${username}`;
    return this.http.get<Msg>(apiUrl);

  }

  fetchAddUsersForm(): Observable<FormDetails>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/fetch-user-form-details';
    return this.http.get<FormDetails>(apiUrl);

  }

  createUserAccount(userData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/create-user-account';
    return this.http.post(apiUrl, userData);
  }

  createNewPayment(paymentData: any) {
    const apiUrl =  this.configService.getApiUrl() + 'water/process-payment';
    return this.http.post<MpesaResult>(apiUrl, paymentData);
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

  fetchSingleUser(username: string): Observable<UserRecordsList>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/fetch-single-user/${username}`;
    return this.http.get<UserRecordsList>(apiUrl);

  }

  getMeters(pageSize?: number, pageNumber?: string): Observable<MeterTable> {
    let apiUrl = this.configService.getApiUrl() + `water/meter-records`;
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page_number', pageNumber.toString());
    }

    console.log(apiUrl)
    console.log('Params:', params);

    return this.http.get<MeterTable>(apiUrl, { params });
  }

  getMeterRecords(pageSize?: number, pageNumber?: string): Observable<MeterRecord> {
    let apiUrl = this.configService.getApiUrl() + `water/water-user-records`;
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page_number', pageNumber.toString());
    }

    console.log(apiUrl)
    console.log('Params:', params);

    return this.http.get<MeterRecord>(apiUrl, { params });
  }

  deleteMeterRecord(id: number): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/delete-meter-record';
    return this.http.post<Msg>(apiUrl, {'id' :id});
  }

  updateMeterRecord(id: number, data: Meter): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/update-meter-record/';
    return this.http.put<Msg>(`${apiUrl}${id}/`, data);
  }

  updateMpesaDetails(id: number,data: any): Observable<any> {
    const apiUrl =  this.configService.getApiUrl() + 'water/update-mpesa-api-details/';
    return this.http.patch<any>(`${apiUrl}${id}/`, data);
  }

  updateUserAccount(id: number, data: any): Observable<Msg> {
    const apiUrl = this.configService.getApiUrl() + 'water/update-user-account/';
    return this.http.patch<Msg>(`${apiUrl}${id}/`, data);
  }


  fetchUserDetails(id:number): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/fetch-user-details/${id}`;
    return this.http.get<Msg>(apiUrl);

  }

  getUsers(pageSize?: number, pageNumber?: string): Observable<UserList> {
    let apiUrl =  this.configService.getApiUrl() + 'water/users/';
    if (pageSize && pageNumber) {
      apiUrl += `?page_size=${pageSize}&page_number=${pageNumber}`;
    }
    return this.http.get<UserList>(apiUrl);
  }

  checkMpesaPayment(data: any): Observable<MpesaResult>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/check-mpesa-payment/';
    return this.http.post<MpesaResult>(apiUrl, data);
  }

  checkMpesaTransaction(data: any): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/check-mpesa-transaction/';
    return this.http.post<any>(apiUrl, data);
  }

}
