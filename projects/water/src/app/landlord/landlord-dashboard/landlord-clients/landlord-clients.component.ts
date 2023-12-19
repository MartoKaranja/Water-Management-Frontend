import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WaterService } from '../../../services/water.service';
import { Client, Msg, ClientList } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-landlord-clients',
  templateUrl: './landlord-clients.component.html',
  styleUrls: ['./landlord-clients.component.css']
})
export class LandlordClientsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate';
  totalItems = 0;

  client_details !: MatTableDataSource<Client>;


  displayedColumns: string[] = ['username', 'current_balance', 'meter_reading', 'valve_state'];

  //public  !: ClientList;
  public msg !: Msg;

  constructor(private waterService: WaterService) {
    this.client_details = new MatTableDataSource<Client>();
  }

  ngOnInit() {
    this.progressBarMode = 'indeterminate';
    this.fetchLandlordClients();


  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.client_details.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.fetchLandlordClients(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString());
    });
  }


  fetchLandlordClients(pageSize?: number, pageNumber?: string, query_string?: string) {
    this.waterService.getLandlordClients().subscribe({
      next: (database_results: ClientList) => {
        //console.log('database result is:' + database_results.results)
        this.totalItems = database_results.count;
        this.client_details.data = database_results.results
        //console.log('database result is:' + this.client_details.data)
        this.progressBarMode = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
