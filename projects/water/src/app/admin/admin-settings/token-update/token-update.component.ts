import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { Meter, MeterTable, Msg } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-token-update',
  templateUrl: './token-update.component.html',
  styleUrls: ['./token-update.component.css']
})
export class TokenUpdateComponent {
  @Output() eventEmitted = new EventEmitter();

  table_source !: MatTableDataSource<Meter>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = [ 'meter_name', 'current_balance', 'input',  'update', 'fetch', 'valve' ];
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

  rechargeMeterToken(token_amount: number, id : number) {
    if (token_amount !== undefined) {
      this.progressBarMode ="indeterminate"
      console.log(token_amount, id);
      let token_data = {
        'token_amount': token_amount,
        'id' : id
      }
      this.dataService.rechargeMeterTokens(token_data).subscribe({
        next: (msg: Msg) => {
          this.msg = msg;
          this.snackBar.open(this.msg.errMsg, 'Close', {
            duration: 10000,
          });

          this.eventEmitted.emit();
          this.progressBarMode = 'determinate';
        },
        error: (error: any) => {
          console.log(error)
        }
      });
    } else {
      console.log('Token amount is undefined', id);
    }
  }

  checkMeterStatus(id: number)
  {
    this.progressBarMode ="indeterminate"
    this.dataService.checkMeterStatus(id).subscribe({
      next:(msg: Msg) => {

        this.msg = msg;
        this.snackBar.open(this.msg.errMsg, 'Close', {
          duration: 10000,
        });
        // snackbar
        //emit to parent
        this.eventEmitted.emit()
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  switchValve(id:number)
  {
    this.progressBarMode ="indeterminate"
    let data = {
      'meter_id' : id
    }
    this.dataService.switchValve(data).subscribe({
      next:(msg: Msg) => {

        this.msg = msg;
        this.snackBar.open(this.msg.errMsg, 'Close', {
          duration: 10000,
        });
        // snackbar
        //emit to parent
        this.eventEmitted.emit()
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }


}
