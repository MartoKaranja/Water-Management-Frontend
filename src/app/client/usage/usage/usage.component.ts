import { Component, Input, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { TaskUsage, TaskTokens } from 'src/app/interfaces/questions.interface';


@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent {

  table_source !: MatTableDataSource<TaskTokens>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['questions_queued','questions_completed','time_started','time_completed', 'prompt_tokens', 'completion_tokens', 'total_tokens','input_cost','output_cost', 'total_cost','no']
  task !: TaskUsage
  totalItems = 0;
  progressBarMode = 'determinate'

  constructor(private dataService: QuestionService) {
    this.table_source = new MatTableDataSource<TaskTokens>();
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
    this.dataService.getTaskUsage(pageSize, pageNumber).subscribe({
      next:(task: TaskUsage) => {
        this.task = task;
        this.totalItems = this.task.count;

        const input_usage = 0.0015 / 1000;
        const output_usage = 0.002 / 1000;

        this.task.results.forEach((result) => {
          result.input_cost = result.prompt_tokens * input_usage;
          result.output_cost = result.prompt_tokens * output_usage;
          result.total_cost = result.input_cost + result.output_cost;

          // Round off to two decimal places
          result.input_cost = Number(result.input_cost.toFixed(2));
          result.output_cost = Number(result.output_cost.toFixed(2));
          result.total_cost = Number(result.total_cost.toFixed(2));
        });

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
