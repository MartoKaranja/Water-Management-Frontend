import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public summary_records = 0;
  public results!:any;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.questionService.getGeneratedAnswersHistory().subscribe({
      next: (results: any) => {
        this.summary_records = results.length
        this.results = results;
        console.log('Result:', results);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
