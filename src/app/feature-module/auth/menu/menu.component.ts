import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Validators, FormBuilder, MaxLengthValidator, FormGroupDirective } from '@angular/forms';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { MenuService } from '../services/menu/menu.service';
import { Pagination } from 'src/app/utility/services/paging/paging';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus = [];
  columns: string[] = ['sl', 'name', 'componentName', 'url', 'parent', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public pagination = new Pagination();
  menuForm = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.maxLength(128)]],
    componentName: [null, [Validators.maxLength(256)]],
    url: [null, [Validators.required]],
    domain: [null],
    parentMenuId : [null]
  });

  asyncval: any;

  constructor(
    private menuService: MenuService,
    private messageService: MessageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.menuService.gets().subscribe(
      (res: []) => {
        this.menus = res.filter((x: any) => x.parentMenuId == null);
        this.load(res);
      },
      error => {}
    );
  }

  load(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  save(formDirective: FormGroupDirective) {
    const entity = this.menuForm.value;

    if (entity.id > 0) {
      this.menuService.edit(entity.id, entity)
      .subscribe(
        res => {
        this.resetFrom(formDirective);
        const index = this.dataSource.data.findIndex((x: any) => x.id == entity.id );
        this.dataSource.data[index] = res;
        this.load(this.dataSource.data);
        this.messageService.show(this.messageService.msgUpdate, 'success');
      },
      err => {
        this.messageService.show(err.error.message, "error");
      });
    } else {
      this.menuService.add(entity)
      .subscribe(
        res => {
        this.resetFrom(formDirective);
        this.dataSource.data.push(res);
        this.load(this.dataSource.data);
        this.messageService.show(this.messageService.msgSave, 'success');
      },
      err => {
        this.messageService.show(err.error.message, "error");
      }
      );
    }
  }

  edit(id: number) {
    this.menuService.getById(id).subscribe(res => {
      this.menuForm.setValue({
        id: res.id,
        name: res.name,
        componentName: res.componentName,
        url: res.url,
        domain: res.domain,
        parentMenuId : res.parentMenuId
      });
    });
  }

  delete(id: number) {
    this.messageService.confirm(this.messageService.msgConfirmDelete).then((result) => {
      if (result.value) {
        this.menuService.delete(id).subscribe(res => {
          const index = this.dataSource.data.findIndex((x: any) => x.id == id);
          this.dataSource.data.splice(index, 1);
          this.load(this.dataSource.data);
          this.messageService.show(this.messageService.msgDelete, 'success');
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  resetFrom(formDirective: FormGroupDirective) {
     this.menuForm.reset();
     formDirective.resetForm();
  }
}
