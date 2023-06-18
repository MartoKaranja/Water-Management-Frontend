
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

export interface MeterRecord{
  errMsg: string;
  pageInfo: PageInfo;
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
