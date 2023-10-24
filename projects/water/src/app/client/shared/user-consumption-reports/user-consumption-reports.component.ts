import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Water, Msg, ConsumptionRecords, FormDetails, Consumption, UserRecords } from '../../../interfaces/questions.interface';
import { PlotlyService } from '../../../services/plotly.service';
import { DateRange } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-consumption-reports',
  templateUrl: './user-consumption-reports.component.html',
  styleUrls: ['./user-consumption-reports.component.css']
})
export class UserConsumptionReportsComponent {

  @Input() waterService !: WaterService;
  @Input() user_name !: string;
  @Output() coordinates = new EventEmitter();
  consumption_sums !: any[];

  dateForm !: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  results !: any;
  data !: ConsumptionRecords;
  query_string !:string;

  start_date !: any;
  end_date !: any;

  selected !: Date | null;

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  table_source !: MatTableDataSource<Consumption>;

  constructor(private plot : PlotlyService, private fb : FormBuilder, private datePipe : DatePipe) {
    this.table_source = new MatTableDataSource<Consumption>();
    this.dateForm = this.fb.group({
      start_date: [''],
      end_date: ['']
    });
  }


  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.start_date = this.datePipe.transform(this.selectedRangeValue.start, 'yyyy-MM-dd');
    this.end_date = this.datePipe.transform(this.selectedRangeValue.end, 'yyyy-MM-dd');





  }

  fetchResults()
  {
    this.query_string = `?meter__user_records__user__username=${this.user_name}`;



    if (this.start_date !== null && this.end_date !== null)
    {
      this.query_string +=  `&reading_time_after=${this.start_date}&reading_time_before=${this.end_date}`;
      this.getConsumptionRecords(1000,'1',this.query_string);

      let data = {
        start_date: this.start_date,
        end_date: this.end_date,
        filter_user: [this.user_name]
      };

      console.log(data)

      this.waterService.getConsumptionTotal(data).subscribe({
        next:(results : any) => {

          this.consumption_sums = results

          this.progressBarMode = 'determinate';
        },
        error: (error: any) => {
          console.error(error);

        }
        });

    }
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
    this.progressBarMode = 'indeterminate';
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
