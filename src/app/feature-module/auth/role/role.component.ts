import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role/role.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { Pagination } from 'src/app/utility/services/paging/paging';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  columns: string[] = ['sl', 'name', 'description', 'Status', 'action'];
  public pagination = new Pagination();
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  roleForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    description: [''],
    isActive: [true]
  });

  constructor(private roleService: RoleService, private fb: FormBuilder, private messageService: MessageService, ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.roleService.gets().subscribe(res => {
      this.load(res);
    }, (error => {
    }));
  }

  load(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  save(formDirective: FormGroupDirective) {
    let entity = this.roleForm.value;
    entity.statusId = entity.isActive ? 1 : 2;

    if (entity['id'] > 0) {
      this.roleService.edit(entity['id'], entity).subscribe(res => {
        this.resetFrom(formDirective);
        const index = this.dataSource.data.findIndex(x => x['id'] == entity['id']);
        // this.dataSource.data[index] = res;
        // this.load(this.dataSource.data);
        this.getAll();
        this.messageService.show(this.messageService.msgUpdate, 'success');
      }, err => {
        this.messageService.show(err.error.message, 'error');
      });
    } else {
      this.roleService.add(entity).subscribe(res => {
        this.resetFrom(formDirective);
        // this.dataSource.data.push(res);
        // this.load(this.dataSource.data);
        this.getAll();
        this.messageService.show(this.messageService.msgSave, 'success');
      }, err => {
        this.messageService.show(err.error.message, 'error');
      });
    }
    //this.getAll();;
  }

  edit(id: number) {
    this.roleService.getById(id).subscribe(res => {
      this.roleForm.setValue({
        id: res.id,
        description: res.description,
        name: res.name,
        isActive: res.statusId == 1 ? true : false
      });
    });
  }

  delete(id: number) {
    this.messageService.confirm(this.messageService.msgConfirmDelete).then((result) => {
      if (result.value) {
        this.roleService.delete(id).subscribe(res => {
          const index = this.dataSource.data.findIndex(x => x['id'] == id);
          this.dataSource.data.splice(index, 1);
          this.load(this.dataSource.data);
          this.messageService.show(this.messageService.msgDelete, 'success');
        });
      }
    })
  }

  resetFrom(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.roleForm.reset({ isActive: true });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ChangePage($event) {
    this.pagination.pageSize = $event.pageSize;
    this.pagination.pageIndex = $event.pageIndex;
  }
}
