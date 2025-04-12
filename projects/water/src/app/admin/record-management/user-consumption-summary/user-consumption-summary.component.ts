import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { UserRecordsList, Msg, UserRecords } from '../../../interfaces/questions.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from '../../../shared_modules/invoice/invoice/invoice.component';

@Component({
  selector: 'app-user-consumption-summary',
  templateUrl: './user-consumption-summary.component.html',
  styleUrls: ['./user-consumption-summary.component.css']
})
export class UserConsumptionSummaryComponent {
  progressBarMode = 'indeterminate';
  totalItems = 0;

  table_source !: MatTableDataSource<UserRecords>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('userSort') sort!: MatSort;

  public record_tables !: UserRecordsList;
  public msg !: Msg;

  @Output() fetchHistoryEvent = new EventEmitter<{ meter_id : string, username: string }>();

  displayedColumns: string[] = ['username','landlord_name', 'current_balance','meter_reading', 'monthly_consumption', 'invoice', 'history'];



  constructor(private waterService: WaterService, private dialog: MatDialog)
  {
    this.table_source = new MatTableDataSource<UserRecords>();
  }


  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.fetchUserRecords();
  }

  ngAfterViewInit() {
    this.table_source.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.fetchUserRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString());
    });
  }

  fetchUserRecords(pageSize?: number, pageNumber?: string) {
    this.waterService.fetchUsersConsumptionSummary().subscribe({
      next: (database_results: UserRecordsList) => {
        console.log(database_results)
        this.record_tables = database_results
        this.progressBarMode = 'determinate';

        this.totalItems = this.record_tables.count;
        this.table_source.data = this.record_tables.results;

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

  fetchHistoryRecords(meter_id: string, username: string)
  {
    this.fetchHistoryEvent.emit({meter_id, username});
  }

  launchInvoiceDialog()
  {
    const dialogRef = this.dialog.open(InvoiceComponent, {
      width: '95vw',
      maxWidth: '100vw',
      // Add any other dialog configuration options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });

  }

}
