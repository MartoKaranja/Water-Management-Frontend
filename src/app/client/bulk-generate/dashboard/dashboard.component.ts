import { Component, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { ScheduleSummaryComponent } from '../../schedule/schedule-summary/schedule-summary.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(ScheduleSummaryComponent) scheduleSummary !: ScheduleSummaryComponent;

  constructor(private dataService : QuestionService)
  {}

  public getQuestionService(): QuestionService {
    return this.dataService;
  }

  onGetTaskProgressEventStart()
  {
    this.scheduleSummary.progressBarMode = "indeterminate"

  }
  onGetTaskProgressEventStop()
  {
    this.scheduleSummary.progressBarMode = "determinate"

  }

  onGetTaskHistory() {
    // Call the getTaskHistory method on the app-schedule-summary component
    this.scheduleSummary.getTasksHistory();
  }


}
