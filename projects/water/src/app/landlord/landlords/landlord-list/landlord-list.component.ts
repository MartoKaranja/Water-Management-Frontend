import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource } from '@angular/material/table';
import { LandlordRecords, LandlordRecordsList } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-landlord-list',
  templateUrl: './landlord-list.component.html',
  styleUrls: ['./landlord-list.component.css']
})
export class LandlordListComponent {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    progressBarMode = 'determinate';
    totalItems = 0;

    @Output() userIdEmitted = new EventEmitter<number>();


    displayedColumns: string[] = ['landlord_name', 'total_clients','manage', 'add'];

    results !: any;
    record_results !: LandlordRecordsList;
    query_string !:string;

    table_source !: MatTableDataSource<LandlordRecords>;
    
    constructor(private waterService : WaterService) {
      this.table_source = new MatTableDataSource<LandlordRecords>();
      
    }

    ngOnInit() {
      this.progressBarMode = 'indeterminate';
      this.query_string = ``;
      this.getLandlordRecords(10,'1',this.query_string);
    }

    ngAfterViewInit() {
      this.table_source.sort = this.sort;
      this.paginator.page.subscribe(() => {
        this.progressBarMode = 'indeterminate';
        console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
        this.getLandlordRecords(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString());
      });
    }

    getLandlordRecords(pageSize?: number, pageNumber?: string, query_string?: string)
    {
       this.waterService.fetchLandlordRecords().subscribe({
            next: (database_results: LandlordRecordsList) => {
              this.record_results = database_results
      
              this.totalItems = this.record_results.count;
              this.table_source.data = this.record_results.results;
      
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

    addUsers()
    {}

    manageUsers(user_id: number)
    {
      this.userIdEmitted.emit(user_id);

    }




}
