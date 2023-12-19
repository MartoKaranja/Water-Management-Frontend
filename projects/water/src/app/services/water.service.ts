import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaterRecords, MeterRecord, Msg, UserRecords, PaymentRecords, MeterTable, Meter, UserRecordsList, UserList, MpesaResult, FormDetails, ConsumptionRecords, MpesaPaymentDetails, TaskTransactionList, RechargeProgressResults, MeterQueryResults, ClientList } from '../interfaces/questions.interface';
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

  getLandlordConsumptionRecordsSummary(pageSize?: number, pageNumber?: string, query_string?: string): Observable<ConsumptionRecords> {
    let apiUrl =  this.configService.getApiUrl() + 'water/landlord-consumption-history-records/';
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

  checkTaskTransactions(pageSize?: number, pageNumber?: number): Observable<TaskTransactionList> {

    const apiUrl =  this.configService.getApiUrl() + 'water/transactions-summary';
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page_number', pageNumber.toString());
    }


    return this.http.get<TaskTransactionList>(apiUrl, { params });
  }


  getLandlordClients(pageSize?: number, pageNumber?: number): Observable<ClientList> {

    const apiUrl =  this.configService.getApiUrl() + 'water/landlord-clients';
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page_number', pageNumber.toString());
    }


    return this.http.get<ClientList>(apiUrl, { params });
  }

  updateUserDetails(): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/update-user-details';
    return this.http.get<Msg>(apiUrl);
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

  get_mpesa_payment_details(user_id : number): Observable<MpesaPaymentDetails>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/view-mpesa-payment-details/${user_id}`;
    return this.http.get<MpesaPaymentDetails>(apiUrl);

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

  createMpesaDetails(data: any): Observable<any> {
    const apiUrl =  this.configService.getApiUrl() + 'water/create-mpesa-api-details/';
    return this.http.post(apiUrl, data);
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

  getConsumptionTotal(data: any): Observable<any> {
    console.log(data)
    let apiUrl =  this.configService.getApiUrl() + 'water/consumption-total/';
    return this.http.post<any>(apiUrl, data);
  }



  getPaymentRecords(pageSize?: number, pageNumber?: string, query_string?: string): Observable<PaymentRecords> {
    let apiUrl =  this.configService.getApiUrl() + 'water/payment-history/';
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
    return this.http.get<PaymentRecords>(apiUrl);
  }

  getLandlordPaymentRecords(pageSize?: number, pageNumber?: string, query_string?: string): Observable<PaymentRecords> {
    let apiUrl =  this.configService.getApiUrl() + 'water/landlord-payment-history/';
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
    return this.http.get<PaymentRecords>(apiUrl);
  }


  checkMeterStatus(meter_no: number): Observable<Msg>
  {
    const apiUrl =  this.configService.getApiUrl() + `water/check-meter-status/${meter_no}`;
    return this.http.get<Msg>(apiUrl);

  }

  rechargeMeterTokens(data: any): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/recharge-meter-tokens';
    return this.http.post<Msg>(apiUrl, data);
  }

  rechargeMeterProgress(data: any): Observable<RechargeProgressResults> {
    const apiUrl =  this.configService.getApiUrl() + 'water/recharge-meter-progress';
    return this.http.post<RechargeProgressResults>(apiUrl, data);
  }

  checkMeterQueryStatus(data: any): Observable<MeterQueryResults> {
    const apiUrl =  this.configService.getApiUrl() + 'water/check-meter-query-status';
    return this.http.post<MeterQueryResults>(apiUrl, data);
  }

  switchValve(data: any): Observable<Msg> {
    const apiUrl =  this.configService.getApiUrl() + 'water/switch-valve';
    return this.http.post<Msg>(apiUrl, data);
  }

  switchValveProgress(data: any): Observable<RechargeProgressResults> {
    const apiUrl =  this.configService.getApiUrl() + 'water/switch-valve-progress';
    return this.http.post<RechargeProgressResults>(apiUrl, data);
  }

  fetchWidgetData(): Observable<any>
  {
    const apiUrl =  this.configService.getApiUrl() + 'water/admin-widgets';
    return this.http.get<any>(apiUrl);

  }

}
