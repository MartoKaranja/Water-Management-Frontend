import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConsumptionRecords, Consumption } from '../../../interfaces/questions.interface';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-records-summary',
  templateUrl: './records-summary.component.html',
  styleUrls: ['./records-summary.component.css']
})
export class RecordsSummaryComponent {

  @Output() dataEvent =  new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  results !: any;
  data !: ConsumptionRecords;
  query_string :string =  '';

  table_source !: MatTableDataSource<Consumption>;

  constructor(private waterService: WaterService) {
    this.table_source = new MatTableDataSource<Consumption>();
  }



  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.getLandlordConsumptionRecords(10,'1',undefined);
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.getLandlordConsumptionRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString(), this.query_string);
    });
  }

  getLandlordConsumptionRecords(pageSize?: number, pageNumber?: string, query_string?: string)
  {
    this.waterService.getLandlordConsumptionRecordsSummary(pageSize, pageNumber, query_string).subscribe({
      next:(consumptionRecords : ConsumptionRecords) => {

        this.data = consumptionRecords
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
