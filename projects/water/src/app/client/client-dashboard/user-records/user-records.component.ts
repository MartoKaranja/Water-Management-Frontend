import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { Water, Msg, ConsumptionRecords, FormDetails, Consumption, UserRecords } from '../../../interfaces/questions.interface';
import { PlotlyService } from '../../../services/plotly.service';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent {
  @Input() waterService !: WaterService;
  @Input() user_name !: string;
  @Output() coordinates = new EventEmitter();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  results !: any;
  data !: ConsumptionRecords;
  query_string !:string;

  table_source !: MatTableDataSource<Consumption>;

  constructor(private plot : PlotlyService) {
    this.table_source = new MatTableDataSource<Consumption>();
  }



  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.query_string = `?meter__user_records__user__username=${this.user_name}`;
    this.getConsumptionRecords(10,'1',this.query_string);
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.getConsumptionRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString(), this.query_string);
    });
  }

  getConsumptionRecords(pageSize?: number, pageNumber?: string, query_string?: string)
  {
    this.waterService.getConsumptionRecordsSummary(pageSize, pageNumber, query_string).subscribe({
      next:(consumptionRecords : ConsumptionRecords) => {

        this.data = consumptionRecords
        this.totalItems = this.data.count;
        this.totalItems = this.data.count;
        this.table_source.data = this.data.results;

        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize

        let x = this.data.results.map(record => record.reading_time);
        let y = this.data.results.map(record => record.consumption);
        let y1= this.data.results.map(record => record.meter_reading);

        this.sendData({x,y,y1})



        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  sendData(data: any)
  {
    this.coordinates.emit(data)
  }

}
