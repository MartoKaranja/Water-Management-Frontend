import { Component, Input } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-answers-summary',
  templateUrl: './answers-summary.component.html',
  styleUrls: ['./answers-summary.component.css']
})
export class AnswersSummaryComponent {

  @Input() dataService !: QuestionService;
  progressBarMode = 'indeterminate';

  public summary_records = 0;
  public results:any = 0;

  constructor() {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.getGeneratedAnswersHistory().subscribe({
      next: (results: any) => {
        this.summary_records = results.length
        this.results = results;
        this.progressBarMode = 'determinate';
        console.log('Result:', results);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
