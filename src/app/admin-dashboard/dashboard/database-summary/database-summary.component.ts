import { Component, Input } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-database-summary',
  templateUrl: './database-summary.component.html',
  styleUrls: ['./database-summary.component.css']
})
export class DatabaseSummaryComponent {

  @Input() dataService !: QuestionService;

  public database_tables:any = [];

  constructor() {

  }

  ngOnInit() {
    this.fetchDatabaseSummary();

  }

  fetchDatabaseSummary() {
    this.dataService.getDatabaseSummary().subscribe({
      next: (database_results: any) => {
        this.database_tables = database_results.tables

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  viewQuestions(database_name:string){
    console.log(database_name)
  }

}
