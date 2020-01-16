import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogGroupHrListComponent } from './dialog-group-hr-list/dialog-group-hr-list.component';
import { ValidateEnrolService } from '../../service/validating-enrollee/validate-enrol.service';
import { EnumService } from 'src/app/utility/services/enum-service/enum.service';
import { Pagination } from 'src/app/utility/services/paging/paging';


@Component({
  selector: 'app-group-hr-list',
  templateUrl: './group-hr-list.component.html',
  styleUrls: ['./group-hr-list.component.scss']
})
export class GroupHRListComponent implements OnInit {

  columns: string[] = ['sl', 'employeeName', 'employeeCertificateNo', 'productType', 'statusName', 'payToName', 'submissionDate'];

  searchObj = {
    status: 1,
    searchText: ""
  };
  claimStatusList: any[] = [];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  public approveRejectButton: boolean = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  groupHrForm = this.fb.group({
    status: ["", [Validators.required]],
  });
  public pagination = new Pagination();
  constructor(
    private messageService: MessageService,
    public dialog: MatDialog,
    private validateEnrolService: ValidateEnrolService,
    private fb: FormBuilder,
    private enumService: EnumService) {
  }

  ngOnInit() {
    this.enumService.getClaimStatus().subscribe(res => {
      this.claimStatusList = res;
      this.groupHrForm.patchValue({
        "status": 1
      });
      this.getDataByStatus();
    })
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.resetSelection();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.approveRejectButton = false;
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  changeCheckbox(row: any) {
    this.selection.toggle(row);
    if (this.selection.selected.length > 0) {
      this.approveRejectButton = false;
    } else {
      this.approveRejectButton = true;
    }
  }

  load(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  approveMultiple(formDirective: FormGroupDirective) {
    this.messageService.confirm(this.messageService.approveConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.approveMultiple(this.selection.selected).subscribe(res => {
          this.messageService.show(this.messageService.approveSuccess, 'success');
          this.refereshPage();

        },
          err => {
            this.messageService.show(err.error.message, 'error');
          });
      }
    });

  }

  rejectMultiple(formDirective: FormGroupDirective) {
    this.messageService.confirm(this.messageService.rejectConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.rejectMultiple(this.selection.selected).subscribe(res => {
          this.messageService.show(this.messageService.rejectSuccess, 'success');
          this.refereshPage();
        },
          err => {
            this.messageService.show(err.error.message, 'error');
          });
      }
    });

  }

  approve(element: any) {
    this.messageService.confirm(this.messageService.approveConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.approve(this.getFormData(element)).subscribe(res => {
          this.messageService.show(this.messageService.approveSuccess, 'success');
          this.refereshPage();
        },
          err => {
            this.messageService.show(err.error.message, 'error');
          });
      }
    });

  }
  reject(element: any) {
    this.messageService.confirm(this.messageService.rejectConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.reject(this.getFormData(element)).subscribe(res => {
          this.messageService.show(this.messageService.rejectSuccess, 'success');
          this.refereshPage();
        }, err => {
          this.messageService.show(err.error.message, 'error');
        });
      }
    });
  }
  getFormData(entity) {
    var formData = new FormData();
    formData.append('model', JSON.stringify(entity));
    return formData;
  }
  edit(id: number) {
    const dialogRef = this.dialog.open(DialogGroupHrListComponent, {
      width: '30%',
      data: {
        id: id,
        mode: "edit"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.refereshPage();
      }
    });
  }
  view(id: number) {
    const dialogRef = this.dialog.open(DialogGroupHrListComponent, {
      width: '30%',
      data: {
        id: id,
        mode: "view"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.refereshPage();
      }
    });
  }

  resetFrom(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.groupHrForm.reset({ isActive: true });
  }

  applyFilter(filterValue: string) {
    this.searchObj.searchText = filterValue;
    this.pagination = new Pagination();
    this.getDataWithPagination();
  }
  isAnySlected() {
    return this.approveRejectButton;
  }

  changePage($event) {
    this.pagination.pageSize = $event.pageSize;
    this.pagination.pageIndex = $event.pageIndex;
    this.pagination.searchObject = JSON.stringify(this.searchObj);
    this.getDataWithPagination();
  }

  getDataWithPagination() {
    this.pagination.searchObject = JSON.stringify(this.searchObj);
    this.validateEnrolService.getByClaimStatusWithPagination(this.pagination).subscribe(res => {
      this.load(res.data);
      this.pagination.totalCount = res.totalCount;
    });
  }
  getDataByStatus() {
    const statusId = parseInt(this.groupHrForm.get("status").value);
    this.searchObj.status = statusId;
    this.hideShowColumnByStatus(statusId);
    this.resetSelection();
    this.getDataWithPagination();
  }
  hideShowColumnByStatus(statusId: number) {
    if (statusId === 1) {
      // only checkbox and action column will be visible on pending status.
      this.columns = ['checkBox', 'sl', 'employeeName', 'employeeCertificateNo', 'productType', 'statusName', 'payToName', 'submissionDate', 'action'];
    } else if (statusId === 2) {
      this.columns = ['sl', 'employeeName', 'employeeCertificateNo', 'productType', 'statusName', 'payToName', 'submissionDate', 'action'];
    }
    else {
      this.columns = ['sl', 'employeeName', 'employeeCertificateNo', 'productType', 'statusName', 'payToName', 'submissionDate'];
    }
  }
  refereshPage() {
    this.resetSelection();
    this.pagination = new Pagination();
    this.getDataWithPagination();
  }
  resetSelection() {
    this.selection.clear();
    this.approveRejectButton = true;
  }

}
