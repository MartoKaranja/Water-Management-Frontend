import { Component, ViewChild, Input } from '@angular/core';
import { PaymentRecords, Payment } from '../../../interfaces/questions.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
//import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterPaymentDetailsDialogComponent } from '../filter-payment-details-dialog/filter-payment-details-dialog.component';

import { WaterService } from '../../../services/water.service';



@Component({
  selector: 'app-filter-payment-reports',
  templateUrl: './filter-payment-reports.component.html',
  styleUrls: ['./filter-payment-reports.component.css']
})
export class FilterPaymentReportsComponent {

  progressBarMode = 'determinate';
  payment_records !: PaymentRecords;
  totalItems = 0;
  table_source !: MatTableDataSource<Payment>;
  query_string :string =  '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateForm !: FormGroup;
  results : any;
  date_filters !: any;

  start_date !: any;
  end_date !: any;
  @Input() selectedRangeValue: DateRange<Date> | undefined;
  selected !: Date | null;

  payment_id!: number;

  constructor(private fb : FormBuilder, private waterService: WaterService, private dialog : MatDialog,) {
    this.table_source = new MatTableDataSource<Payment>();
    this.dateForm = this.fb.group({
      start_date: [''],
      end_date: ['']
    });
  }

  ngOnInit() {
    this.fetchPaymentSummary(5,'1',undefined);

  }
  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.fetchPaymentSummary(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString(), this.query_string);
    });
  }

  fetchPaymentSummary(pageSize?: number, pageNumber?: string, query_string?: string)
  {
    this.waterService.getPaymentRecords(pageSize, pageNumber, query_string).subscribe({
      next: (database_results: PaymentRecords) => {
        console.log("meters summary" + database_results)

        this.payment_records= database_results;
        this.table_source.data = this.payment_records.results;
        this.progressBarMode = 'determinate';
        this.totalItems = this.payment_records.count;

        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

  viewMpesaPaymentDetails(payment_id : number)
  {
    this.payment_id = payment_id;
  }



  /*selectedChange(m: any) {
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
  }*/


  openDialog()
  {
    const dialogRef = this.dialog.open(FilterPaymentDetailsDialogComponent, {
      width: '400px'
    });
    this.progressBarMode = 'determinate';

    dialogRef.afterClosed().subscribe(dialog_result => {
      console.log('The dialog was closed');
      // You can do something with the result here if needed
      if (dialog_result == undefined)
      {
        return;
      }
      this.progressBarMode = 'determinate';

      let start_date = dialog_result.start_date;
      let end_date = dialog_result.start_date;



      this.date_filters = {
        'start_date' : start_date,
        'end_date' : end_date
      }



      // make call to the server to request data
      /*

      this.dataService.getConsumptionTotal({start_date, end_date, filter_user}).subscribe({
        next:(results : any) => {

          this.consumption_sums = results
          console.log(this.consumption_sums)

          this.progressBarMode = 'determinate';
        },
        error: (error: any) => {
          console.error(error);

        }
        });*/



    });

  }

}
