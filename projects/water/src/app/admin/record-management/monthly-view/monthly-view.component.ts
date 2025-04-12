import { Component, ViewChild, ElementRef } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { MonthlyRecords, Msg, MonthlyRecordsList } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.css']
})
export class MonthlyViewComponent {

  @ViewChild('history_table') history_table!: ElementRef;


  displayedColumns: string[] = ['month', 'username', 'min_reading_date', 'max_reading_date', 'first_reading', 'last_reading', 'consumption'];

  progressBarMode = 'determinate';
  table_source !: MatTableDataSource<MonthlyRecords>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('consumptionSort') sort!: MatSort;
  totalItems = 0;
  consumption_sums !: any[];
  coordinates !: any;
  public msg !: Msg;
  meter_id !: string;
  username !: string;

  results !: any;
  data !: MonthlyRecordsList;
  query_string :string =  '';




  constructor(
    private dataService: WaterService,
    private snackBar : MatSnackBar,
    private elementRef: ElementRef
  ) {
    this.table_source = new MatTableDataSource<MonthlyRecords>();
  }

  ngOnInit() {
    
    this.getMonthRecords(10,'1');
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.getMonthRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString());
    });
  }

  getMonthRecords(pageSize?: number, pageNumber?: string)
  {
    this.progressBarMode = 'indeterminate';

    this.dataService.getMonthlyRecords(pageSize, pageNumber, this.meter_id).subscribe({
      next:(monthRecords : MonthlyRecordsList) => {

        this.data = monthRecords
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

  updateHistoryEvent(values: { meter_id: string, username : string })
  {
    this.meter_id = values.meter_id;
    this.username = values.username;
    this.getMonthRecords();
     // Execute the scroll after a slight delay to allow time for the table to render
     console.log(document?.getElementById('history_table'))
     document?.getElementById('history_table')?.scrollIntoView({ behavior: "smooth", block: "start"});

  }

}
