import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dataService : QuestionService)
  {}

  public getQuestionService(): QuestionService {
    return this.dataService;
  }


}
