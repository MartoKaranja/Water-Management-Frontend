import { Component, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { Task, Taskdetail } from 'src/app/interfaces/questions.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from 'src/app/services/configService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  table_source !: MatTableDataSource<Taskdetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['questions_queued','questions_completed', 'total_tokens','time_started','time_completed','processed','no', 'download', 'delete']
  task !: Task
  totalItems = 0;
  progressBarMode = 'determinate'

  constructor(private dataService : QuestionService, private configService: ConfigService) {
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


  downloadTask(task_no: number) {
    this.progressBarMode = 'indeterminate';

    const url = this.configService.getApiUrl() + `questions/export/${task_no}/`;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `task_${task_no}.csv`;

    // Listen for the load event on the link element
    link.addEventListener('load', () => {
      this.progressBarMode = 'determinate';
    });

    // Append the link to the document and click it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.progressBarMode = 'determinate';
  }

  deleteTask(task_no : number)
  {
    if (confirm('Are you sure you want to delete this task?')) {

      this.progressBarMode = 'indeterminate';


      // The user confirmed the deletion, so proceed with the deletion
      this.dataService.deleteTask(task_no).subscribe({
        next:(msg: any) => {
          // The task was deleted successfully
          // ...
          console.log(msg)
          this.getTasksHistory()
          this.progressBarMode = 'determinate';
        },
        error: (error: any) => {
          console.error(error);
          this.progressBarMode = 'determinate';
        }
      });
      // ...
    } else {
      // The user canceled the deletion, so do nothing
    }


  }

}
