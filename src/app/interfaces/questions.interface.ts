
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
