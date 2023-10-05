import { Component, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { DateFilterDialogComponent } from './date-filter-dialog/date-filter-dialog.component';
import { Water, Msg, WaterRecords, FormDetails, ConsumptionRecords, Consumption } from '../../../interfaces/questions.interface';
import { DatePipe } from '@angular/common';
import { ConsumptionFilterDialogComponent } from './consumption-filter-dialog/consumption-filter-dialog.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  results !: any;
  data !: ConsumptionRecords;
  query_string :string =  '';

  table_source !: MatTableDataSource<Consumption>;

  constructor(
    private dataService: WaterService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
    private datePipe: DatePipe) {
    this.table_source = new MatTableDataSource<Consumption>();
  }



  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.getMeterRecords(10,'1',undefined);
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.getMeterRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString(), this.query_string);
    });
  }

  getMeterRecords(pageSize?: number, pageNumber?: string, query_string?: string)
  {
    this.dataService.getConsumptionRecordsSummary(pageSize, pageNumber, query_string).subscribe({
      next:(waterRecords : ConsumptionRecords) => {

        this.data = waterRecords
        this.totalItems = this.data.count;
        this.totalItems = this.data.count;
        this.table_source.data = this.data.results;

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

 openDialog() {
  this.progressBarMode = 'indeterminate';

  if (this.results) {
    this.showDialog();
  } else {
    this.dataService.fetchAddUsersForm().subscribe({
      next: (results: FormDetails) => {
        console.log(results)
        this.results = results

        this.showDialog();
      }
    });
  }
}

showDialog() {
  const dialogRef = this.dialog.open(DateFilterDialogComponent, {
    data: {
      meters: this.results.meters,
      users: this.results.users,
    }
  });
  this.progressBarMode = 'determinate';

  dialogRef.afterClosed().subscribe(dialog_result => {
    console.log('The dialog was closed');
    // You can do something with the result here if needed

    let start_date = this.datePipe.transform(dialog_result.start_date, 'yyyy-MM-dd');
    let end_date = this.datePipe.transform(dialog_result.end_date, 'yyyy-MM-dd');
    let filter_user = dialog_result.users;
    let filter_meter = dialog_result.meters;

    console.log(start_date);
    console.log(end_date);
    console.log(filter_user);
    console.log(filter_meter);

    let old_query = '';

    if (this.query_string !== '')
    {
      old_query = this.query_string;
      this.query_string = '';
    }




    if (start_date !== null)
    {
      this.query_string +=  `?reading_time_after=${start_date}&reading_time_before=${end_date}`;

    }
    if (filter_user !== '')
    {
      if (this.query_string !== '')
      {
        this.query_string +=  `&meter__user_records__user__username=${filter_user}`
      }
      else
      {
        this.query_string +=   `?meter__user_records__user__username=${filter_user}`
      }

    }
    if (filter_meter !== '')
    {
      if (this.query_string !== '')
      {
        this.query_string +=  `&meter_name=${filter_meter}`
      }
      else
      {
        this.query_string +=   `?meter_name=${filter_meter}`
      }
    }

  if (this.query_string !== '')
    {
      this.getMeterRecords(undefined, undefined, this.query_string);
    }
    else
    {
      this.query_string = old_query;
    }

  });
}


  openConsumptionFilterDialog()
  {
    if (this.results) {
      this.showConsumptionDialog();
    } else {
      this.dataService.fetchAddUsersForm().subscribe({
        next: (results: FormDetails) => {
          console.log(results)
          this.results = results

          this.showConsumptionDialog();
        }
      });
    }


  }

  showConsumptionDialog() {
  const dialogRef = this.dialog.open(ConsumptionFilterDialogComponent, {
    data: {
      users: this.results.users,
    }
  });
  this.progressBarMode = 'determinate';

  dialogRef.afterClosed().subscribe(dialog_result => {
    console.log('The dialog was closed');
    // You can do something with the result here if needed

    let start_date = this.datePipe.transform(dialog_result.start_date, 'yyyy-MM-dd');
    let end_date = this.datePipe.transform(dialog_result.end_date, 'yyyy-MM-dd');
    let filter_user = dialog_result.users;


    console.log(start_date);
    console.log(end_date);
    console.log(filter_user);


  });
}

}
