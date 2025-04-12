import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';import { WaterService } from '../../../services/water.service';
import { Router } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenerateInvoiceComponent } from '../generate-invoice/generate-invoice.component';

import { Invoice, InvoiceList, UserSummaryList } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  
  progressBarMode = 'determinate';
  invoice_records !: InvoiceList;
  totalItems = 0;
  table_source !: MatTableDataSource<Invoice>;
  query_string :string =  '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList !: UserSummaryList;

  rows_to_display = ['invoice_no', 'invoice_amount', 'user_no', 'user_name', 'landlord_no', 'landlord_date', "date_issued", "date_updated", "invoice_status"]

  constructor(private waterService : WaterService, private router : Router, private dialog: MatDialog)
  {
    this.table_source = new MatTableDataSource<Invoice>();
  }

  ngOnInit() {
    //this.query_string = `?username=${this.user_name}`
    this.fetchInvoiceHistory(5,'1',this.query_string);

  }

  ngAfterViewInit() {
    this.table_source.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.fetchInvoiceHistory(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString(), this.query_string);
    });
  }


  fetchInvoiceHistory(pageSize?: number, pageNumber?: string, query_string?: string)
  {

    this.progressBarMode = 'indeterminate';
    this.waterService.getInvoiceHistory(pageSize, pageNumber, query_string).subscribe({
      next: (database_results: InvoiceList) => {
        console.log("meters summary" + database_results)

        this.invoice_records= database_results;
        this.table_source.data = this.invoice_records.results;
        this.progressBarMode = 'determinate';
        this.totalItems = this.invoice_records.count;

        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

  fetchUserListDialog() {
    this.waterService.getUserList().subscribe({
      next: (userList: UserSummaryList) => {
        console.log("Users list", userList);
        this.userList = userList;

        this.progressBarMode = 'determinate';
        this.openDialog()
        
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  openDialog()
  {
    this.progressBarMode = 'indeterminate';
    const dialogRef = this.dialog.open(GenerateInvoiceComponent, {
      width: '85vw',
      maxWidth: '100vw',
      // Add any other dialog configuration options here
      data: { users: this.userList  }
    });
    this.progressBarMode = 'determinate';

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }

}
