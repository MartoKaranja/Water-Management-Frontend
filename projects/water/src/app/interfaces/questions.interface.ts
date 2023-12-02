import { MeterDashboardComponent } from "../admin/meter-overview/meter-dashboard/meter-dashboard.component";

export interface Question {
  count: number;
  next: string;
  previous: string;
  results: Array<QuestionResult>
}

export interface QuestionResult {
  no: number;
  title: string;
  content: string;
  content_length: number;
  category: string;
  project: string;
  spider: string;
  server: string;
  date_scraped: string;
  date_recorded: string;
  processed: string;
  short: string;
  link_no: number;
}

export interface Title{
  count: number;
  next: string;
  previous: string;
  results: Titledetail[]

}

export interface Titledetail {
  no: number
  title: string,
  category: string;
  selected: boolean;
}

export interface GeneratedAnswer {
  no: number;
  question :
  {
    title: string;
    category: string;
    content : string;
  },
  generated_text : string;
  selected: boolean;
}

export interface Answer{
  count: number;
  next: string;
  previous: string;
  results: GeneratedAnswer[]

}


export interface DatabaseQuestion{
  count: number;
  results: Dbdetail[]

}
export interface Dbdetail {
  link_no: number
  title: string,
  category: string;
  selected: boolean;
}

export interface Task{
  count: number;
  next: string;
  previous: string;
  results: Taskdetail[]

}

export interface Taskdetail {
  no: number
  task_name: string
  total_tokens : number
  questions_queued:number
  questions_completed :number
  time_started : string
  time_completed:string
  processed : string
}

export interface WaterRecords{
  count: number;
  next: string;
  previous: string;
  results: Water[]
}

export interface Water{
  current_balance : number;
  meter_reading : number;
  valve_state : number;
  record_id : string;
}

export interface MeterHistoryRecords{
  count: number;
  next: string;
  previous: string;
  results: MeterHistory[]
}

export interface MeterHistory{
  id: number;
  meter_name : string;
  reading_time : number;
  user_name: string;
  water_reading : number;

}

export interface MeterRecord{
  errMsg: string;
  pageInfo: PageInfo;
  count: number;
  next: string;
  previous: string;
  values: Meter[]
}

export interface Meter{
  balance: number;
  customerName: string;
  id: number;
  readings : number;
  valveStatus : number;


}
export interface PageInfo{
  pageNumber : number;
  pageSize : number;
  pageTotal : number;
}

export interface Msg{
  errMsg : string;
}

export interface UserRecords {
  user : UserDashboard;
  meter : Meter;
  landlord : Landlord;
  user_profile : UserProfile;
}

export interface UserRecordsList{
  count: number;
  next: string;
  previous: string;
  results: UserRecords[]

}

export interface UserDashboard{
  username : string,
  id : number;
}

export interface Landlord {
  tenant_name : string;
  id : number;
}

export interface UserProfile{
  phone_number : string;
  cash_balance : number;
  token_balance : number;
}


export interface Meter
{
  meter_name : string;
  id : number;
  current_balance: number
  meter_reading : number;
  valve_state : string;
  imei : string;

}

export interface MeterTable{
  count: number;
  next: string;
  previous: string;
  results: Meter[]

}
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_landlord : boolean;
  date_joined: Date;
  last_login: Date;
}

export interface UserList
{
  count: number;
  next: string;
  previous: string;
  results: User[]

}

export interface MpesaResult{
 response : MpesaResultDetails;
 tokens : number;
 msg ?: string;
}

export interface MpesaResultDetails{
  resultDesc ?: string;
  resultCode ?: number;
  responseDescription ?: string;
  responseCode ?: number;
  conversation_id ?: string;
  merchantRequestID : string;
  checkoutRequestID : string;
  customerMessage : string;
}
 export interface FormDetails{
  users : FormUser[];
  meters : FormMeters[];
  landlords : FormLandlord[];
 }

 export interface FormUser{
  userId : number;
  userName : string;
 }
 export interface FormMeters{
  userId : number;
  meterName : string;
 }
 export interface FormLandlord{
  userId : number;
  landlordName : string;

 }
 export interface ConsumptionRecords{
  count: number;
  next: string;
  previous: string;
  results: Consumption[]
}

export interface Consumption{
  id: number
  user_name : string;
  reading_time : number;
  consumption : number;
  meter_reading : number;
}

export interface PaymentRecords{
  count: number;
  next: string;
  previous: string;
  results: Payment[]
}

export interface Payment{
  id : number;
  user_id: number
  username : string;
  payment_type : string;
  payment_reference : string;
  token_amount : number;
  time_started : number;
  time_completed : number;
  payment_status : string;
  tokens_assigned : number;
}

export interface MpesaPaymentDetails {
  id: number;
  payment_amount: number;
  merchantRequestID: string;
  checkoutRequestID: string;
  conversation_id: string;
  transaction_id: string;
  responseCode: string;
  responseDescription: string;
  customerMessage: string;
  resultCode: string;
  resultDesc: string;
  mpesaReceiptNumber: string;
  phoneNumber: string;
  recordedTransactionDate: string;
  time_started: Date;
  time_completed: Date;
}


export interface TaskTransaction{
  id : number;
  value_id : number;
  description : string;
  transaction_type : string;
  transaction_progress : string;
  time_started : string;
  time_completed : string;
  user_id : number;

}

export interface TaskTransactionList {
  count: number;
  next: string;
  previous: string;
  results: TaskTransaction[];
}

export interface RechargeProgressResults
{
  errcode : number;
  errmsg : string;
  state : number;
}

export interface MeterQueryResults
{
  errcode : number;
  errmsg : string;
  state : number;
  'Cumulative flow' : string;
  Balance : string;
  'Signal strength' : string;
  'Signal to noise ratio' : string;
  'Valve status' : string;
  'Battery undervoltage' : string;
  'Reverse flow' : string;
  'Valve failure alarm' : string;
  'Strong magnetic interference alarm' : string;
  'Backup battery switch alarm' : string;
  'Hall Metering fault alarm' : string;

}
