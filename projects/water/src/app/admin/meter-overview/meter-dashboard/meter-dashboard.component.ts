import { Component, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Meter, MeterTable, Msg } from '../../../interfaces/questions.interface';
import { EditMeterRecordComponent } from '../../meter/edit-meter-record/edit-meter-record.component';



@Component({
  selector: 'app-meter-dashboard',
  templateUrl: './meter-dashboard.component.html',
  styleUrls: ['./meter-dashboard.component.css']
})
export class MeterDashboardComponent {
  table_source !: MatTableDataSource<Meter>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = [ 'meter_name', 'current_balance', 'meter_reading', 'valve_state', 'imei','id', 'update' ];
  data !: MeterTable;
  totalItems = 0;
  progressBarMode = 'determinate';
  msg !: Msg;

  constructor(private dataService: WaterService, private snackBar : MatSnackBar, private dialog : MatDialog) {
    this.table_source = new MatTableDataSource<Meter>();
  }

  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.getMeters();
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex).toString())
      this.getMeters(this.paginator.pageSize, (this.paginator.pageIndex).toString());
    });
  }

  getMeters(pageSize?: number, pageNumber?: string)
  {
    this.dataService.getMeters(pageSize, pageNumber).subscribe({
      next:(meterTable: MeterTable) => {

        this.data = meterTable
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

  openCreateMeterDialog(meter : Meter) {
    const dialogRef = this.dialog.open(EditMeterRecordComponent, {
      width: '37%', // Set the desired width here
      data: { meter : meter  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true )
      {
        this.getMeters();
      }
      // Handle any actions after the dialog is closed
      // For example, you can refresh the list of existing users
    });
  }

  deleteMeterRecords(id: number)
  {
    this.dataService.deleteMeterRecord(id).subscribe({
      next:(msg: Msg) => {
        console.log(msg)
        this.snackBar.open("Meter deleted successfully!", 'Close', {
          duration: 10000,
        });

        //refresh meter records
        this.getMeters();
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

}
