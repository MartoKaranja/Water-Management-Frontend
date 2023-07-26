import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Question, User } from 'src/app/interfaces/questions.interface';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dataService: QuestionService)
  {

  }

  public getQuestionService(): QuestionService {
    return this.dataService;
  }


}


