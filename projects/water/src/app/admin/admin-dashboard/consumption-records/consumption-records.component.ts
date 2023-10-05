import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { Water, Msg, ConsumptionRecords, FormDetails, Consumption } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-consumption-records',
  templateUrl: './consumption-records.component.html',
  styleUrls: ['./consumption-records.component.css']
})
export class ConsumptionRecordsComponent {
  @Input() waterService !: WaterService;
  @Output() dataEvent =  new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  results !: any;
  data !: ConsumptionRecords;
  query_string :string =  '';

  table_source !: MatTableDataSource<Consumption>;

  constructor() {
    this.table_source = new MatTableDataSource<Consumption>();
  }



  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.getConsumptionRecords(10,'1',undefined);
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
        this.progressBarMode = 'determinate';

        // send call to parent component
        this.sendData();
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  sendData() {
    console.log("Calling parent component" + this.data.results )
    this.dataEvent.emit(this.data.results);
  }

}
