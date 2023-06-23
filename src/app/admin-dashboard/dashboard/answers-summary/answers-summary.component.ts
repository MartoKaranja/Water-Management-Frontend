import { Component, Input, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { Task, Taskdetail } from 'src/app/interfaces/questions.interface';

@Component({
  selector: 'app-answers-summary',
  templateUrl: './answers-summary.component.html',
  styleUrls: ['./answers-summary.component.css']
})
export class AnswersSummaryComponent {

  @Input() dataService !: QuestionService;
  table_source !: MatTableDataSource<Taskdetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['questions_queued','questions_completed', 'total_tokens','time_started','time_completed','processed','no']
  task !: Task
  totalItems = 0;
  progressBarMode = 'determinate'

  constructor() {
    this.table_source = new MatTableDataSource<Taskdetail>();
  }

  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.getTasksHistory();
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex).toString())
      this.getTasksHistory(this.paginator.pageSize, (this.paginator.pageIndex).toString());
    });
  }

  getTasksHistory(pageSize?: number, pageNumber?: string){
    this.dataService.getTaskHistory(pageSize, pageNumber).subscribe({
      next:(task: Task) => {
        this.task = task;
        this.totalItems = this.task.count;
        this.table_source.data = this.task.results;

        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize
        this.progressBarMode = 'determinate';
    },
    error: (error: any) => {
      console.error(error);

    }
    });
  }

}
