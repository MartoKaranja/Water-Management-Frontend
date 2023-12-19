import { Component, ViewChild } from '@angular/core';
import { PaymentRecords, Payment } from '../../../interfaces/questions.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent {
  progressBarMode = 'determinate';
  payment_records !: PaymentRecords;
  totalItems = 0;
  table_source !: MatTableDataSource<Payment>;
  query_string :string =  '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private waterService : WaterService)
  {
    this.table_source = new MatTableDataSource<Payment>();
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
    this.waterService.getLandlordPaymentRecords(pageSize, pageNumber, query_string).subscribe({
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

}
