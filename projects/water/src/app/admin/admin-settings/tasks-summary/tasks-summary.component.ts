import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { TaskTransaction, TaskTransactionList, Msg } from '../../../interfaces/questions.interface';
import { TasksResultsDialogComponent } from '../tasks-results-dialog/tasks-results-dialog.component';

@Component({
  selector: 'app-tasks-summary',
  templateUrl: './tasks-summary.component.html',
  styleUrls: ['./tasks-summary.component.css']
})
export class TasksSummaryComponent {
  table_source !: MatTableDataSource<TaskTransaction>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = [ 'description', 'transaction_type', 'transaction_progress', 'action' ];
  data !: TaskTransactionList;
  totalItems = 0;
  progressBarMode = 'determinate';
  msg !: Msg;

  constructor(private dataService: WaterService, private snackBar : MatSnackBar, private dialog : MatDialog) {
    this.table_source = new MatTableDataSource<TaskTransaction>();
  }

  ngOnInit() {

    this.getMeters(5,0);
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;

    this.paginator.page.subscribe(() => {
      //console.log(this.paginator.pageSize, this.paginator.pageIndex)
      this.getMeters(this.paginator.pageSize, this.paginator.pageIndex);
    });
  }

  getMeters(pageSize?: number, pageNumber?: number)
  {
    this.progressBarMode = 'indeterminate';
    this.dataService.checkTaskTransactions(pageSize, pageNumber).subscribe({
      next:(taskTable: TaskTransactionList) => {

        this.data = taskTable
        this.totalItems = this.data.count;
        this.totalItems = this.data.count;
        this.table_source.data = this.data.results;


        this.paginator.length = this.totalItems;

        //console.log("Paginator length "+this.paginator.length)
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize
        //this.table_source.paginator = this.paginator;
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  openDialog(data : TaskTransaction)
  {
    this.progressBarMode = 'indeterminate';

    const dialogRef = this.dialog.open(TasksResultsDialogComponent, {
      data : data
    });
    this.progressBarMode = 'determinate';

    dialogRef.afterClosed().subscribe(dialog_result => {
      console.log('The dialog was closed');
      if (dialog_result.state === 3 || dialog_result.state === 4|| dialog_result.state === 2)
      {
        this.getMeters(5, 0)
      }
      // You can do something with the result here if needed


    });

  }

}
