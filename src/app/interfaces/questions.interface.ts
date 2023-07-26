
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
  task_no : number;
  question :
  {
    title: string;
    category: string;
    content : string;
  },
  processed : string;
  generated_text : string;
  selected: boolean;
  view: null;
}

export interface Answer{
  count: number;
  next: string;
  previous: string;
  results: GeneratedAnswer[]

}

export interface Article{
  count: number;
  next: string;
  previous: string;
  results: GeneratedArticle[]

}
export interface GeneratedArticle {
  no: number;
  task_no : number;
  processed : string;
  generated_text : string;
  selected: boolean;
  view: null;
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
  content_generated :number
  time_started : string
  time_completed:string
  processed : string
  type : string
}

export interface TaskDashboardDetail
{
  no: number
  task_name: string
  total_tokens : number
  questions_queued:number
  content_generated :number
  time_started : string
  time_completed:string
  processed : string
  export : null
  delete:null

}

export interface TaskUsage{
  count: number;
  next: string;
  previous: string;
  results: TaskTokens[]

}

export interface TaskTokens {
  no: number
  task_name: string
  prompt_tokens: number
  completion_tokens : number
  total_tokens : number
  questions_queued:number
  questions_completed :number
  time_started : string
  time_completed:string
  processed : string
  input_cost ?: number;
  output_cost ?: number;
  total_cost ?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
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
