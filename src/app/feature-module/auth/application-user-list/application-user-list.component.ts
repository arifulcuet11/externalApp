import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { NavigateService } from 'src/app/utility/services/navigate/navigate.service';
import { Pagination } from 'src/app/utility/services/paging/paging';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-application-user-list',
  templateUrl: './application-user-list.component.html',
  styleUrls: ['./application-user-list.component.scss']
})
export class ApplicationUserListComponent implements OnInit {
  columns: string[] = ['sl', 'firstName', 'lastName', 'email', 'phoneNumber', 'isHeadOfficeUser', 'action'];

  public pagination = new Pagination();
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService,
    private authService: AuthService,
    public naviagte: NavigateService) { }

  ngOnInit() {
   this.getUserWithPagination();
  }

  loadData(users: any[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.sort = this.sort;
  }

  edit(userId: number) {
    this.naviagte.toUpdateUser(userId)
  }

  applyFilter(text) {
    this.pagination = new Pagination();
    this.pagination.searchText = text;
    this.getUserWithPagination();
  }
  getUserWithPagination() {
    this.userService.getUserWithPagination(this.pagination).subscribe(res => {
      this.loadData(res.data);
      this.pagination.totalCount = res.totalCount;
    });
  }
  ChangePage($event) {
    this.pagination.pageSize = $event.pageSize;
    this.pagination.pageIndex = $event.pageIndex;
    this.getUserWithPagination();
  }


}
