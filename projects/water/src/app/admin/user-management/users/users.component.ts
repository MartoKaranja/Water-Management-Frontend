import { Component,Input, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserList, User } from 'src/app/interfaces/questions.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @Input() dataService !: WaterService;
  displayedColumns: string[] = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'last_login', 'view', 'delete'];
  table_source !: MatTableDataSource<User>;
  user_list !: UserList;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  progressBarMode = 'determinate'

  constructor ()
  {
    this.table_source = new MatTableDataSource<User>();
  }



  ngOnInit() {
    this.table_source.paginator = this.paginator;
    this.progressBarMode = 'indeterminate';
    this.getUsersList();
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    //this.table_source.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.progressBarMode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString())
      this.getUsersList(this.paginator.pageSize, (this.paginator.pageIndex + 1).toString());
    });
  }

  getUsersList(pageSize?: number, pageNumber?: string){

    this.dataService.getUsers(pageSize, pageNumber).subscribe({
      next:(user_list: UserList) => {
        this.user_list = user_list;
        this.totalItems = this.user_list.count;
        this.table_source.data = this.user_list.results;

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



}
