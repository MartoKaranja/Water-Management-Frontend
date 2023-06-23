import { Component, Input } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { Router, NavigationExtras } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-database-summary',
  templateUrl: './database-summary.component.html',
  styleUrls: ['./database-summary.component.css']
})
export class DatabaseSummaryComponent {

  @Input() dataService !: QuestionService;
  progressBarMode = 'indeterminate';

  public database_tables:any = [];

  constructor(private router : Router) {
  }

  ngOnInit() {
    this.fetchDatabaseSummary();

  }

  fetchDatabaseSummary() {
    this.dataService.getDatabaseSummary().subscribe({
      next: (database_results: any) => {
        this.database_tables = database_results.tables
        this.progressBarMode = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  public getQuestionService(): QuestionService {
    return this.dataService;
  }





}
