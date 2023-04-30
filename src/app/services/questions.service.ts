import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Title, Answer } from '../interfaces/questions.interface';
import { ConfigService } from './configService';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private http: HttpClient, private configService: ConfigService) { }

  getQuestions(): Observable<Question> {
    const apiUrl =  this.configService.getApiUrl() + 'questions/';
    return this.http.get<Question>(apiUrl);
  }/*
  getQuestionTitlebyId(id: number): Observable<string> {
    const apiUrl = this.configService.getApiUrl() + `questions/${id}/title`;
    return this.http.get<string>(apiUrl);
  }*/
  getQuestionTitles(pageSize?: number, pageNumber?: string): Observable<Title> {
    let apiUrl = this.configService.getApiUrl() + `questions/titles`;
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    console.log(apiUrl)
    console.log('Params:', params);

    return this.http.get<Title>(apiUrl, { params })
      .pipe(
        map((title: Title) => {
          title.results = title.results.map(item => ({ ...item, selected: false }));
          return title;
        })
      );
  }

  getGeneratedAnswers(ids: any[], pageSize?: number, pageNumber?: string, ): Observable<Answer> {
    let apiUrl = this.configService.getApiUrl() + `questions/generated_answers/`;
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    console.log(apiUrl)
    console.log('Params:', params);

    const body = { ids: ids };
    console.log(body)

    return this.http.post<Answer>(apiUrl, body, { params })
      .pipe(
        map((answer: Answer) => {
          answer.results = answer.results.map(item => ({ ...item, selected: false }));
          return answer;
        })
      );
  }

  getQuestionDetails(id: string): Observable<any> {
    const url = this.configService.getApiUrl() + `questions/details/${id}`;
    return this.http.get(url);
  }

  getGeneratedAnswersHistory(): Observable<any> {
    const url = this.configService.getApiUrl() + `questions/generated-answers-history/`;
    return this.http.get(url);
  }

  processQuestion(question: { question: string }): Observable<any> {
    const url = this.configService.getApiUrl() + 'questions/answer_single/';
    return this.http.post(url, { question });
  }

  processQuestions(ids: any): Observable<any>{
    const url = this.configService.getApiUrl() + 'questions/answer_multiple/';
    return this.http.post(url, { ids });
  }

  checkProgress(ids: any): Observable<any>{
    const url = this.configService.getApiUrl() + 'questions/check_progress/';
    return this.http.post(url, { ids });
  }


  getToken() {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
    return null;
  }

  getPrompt()
  {
    const url = this.configService.getApiUrl() + `questions/fetch_prompt`;
    return this.http.get(url);
  }

  updatePrompt(prompt: string)
  {
    const url = this.configService.getApiUrl() + 'questions/update_prompt/';
    return this.http.post(url, { prompt });

  }

  getDatabaseSummary()
{
  const url = this.configService.getApiUrl() + `questions/database-summary`;
  return this.http.get(url);

}


}


