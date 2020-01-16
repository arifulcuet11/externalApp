import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateEnrolService } from '../../../service/validating-enrollee/validate-enrol.service';
import { EnumService } from 'src/app/utility/services/enum-service/enum.service';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { FileValidatorService } from '../../../service/file-validator/file-validator.service';
import { IFileOptions, FileHandlerService } from 'src/app/utility/services/file-handler/file-handler.service';
import { ValidatorType } from 'src/app/utility/enum/global-enum';

@Component({
  selector: 'app-dialog-group-hr-list',
  templateUrl: './dialog-group-hr-list.component.html',
  styleUrls: ['./dialog-group-hr-list.component.scss']
})
export class DialogGroupHrListComponent implements OnInit {
  isViewMode = false;
  groupClaimSubmissionId: number = 0;
  claimPayToList: any[] = [];
  fileOption: IFileOptions = { acctptedTypes: '' };
  file: File;
  fileUpload: boolean = false;
  submitButton: boolean = true;
  enrollClaimForm = this.fb.group({
    id: [0],
    employeeName: ["", [Validators.required]],
    employeeCertificateNo: ["", [Validators.required]],
    patientName: ["", [Validators.required]],
    productType: ["", [Validators.required]],
    claimAmount: ["", [Validators.required]],
    payTo: ["", [Validators.required]],
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private validateEnrolService: ValidateEnrolService,
    private enumService: EnumService,
    private messageService: MessageService,
    private fileValidatorService: FileValidatorService,
    private fileHandlerService: FileHandlerService,
    public dialogRef: MatDialogRef<DialogGroupHrListComponent>) { }

  ngOnInit() {

    this.groupClaimSubmissionId = this.data.id;
    if (this.data.mode === "view") {
      this.isViewMode = true;
      this.enrollClaimForm.controls['payTo'].disable();
    }

    this.enrollClaimForm.patchValue({
      id: this.groupClaimSubmissionId,
    });

    this.validateEnrolService.getByIdCustom(this.groupClaimSubmissionId).subscribe(res => {
      this.payTo(res.payTo);
      this.enrollClaimForm.patchValue(res);
    });

    this.enumService.getClaimPayTo().subscribe(res => {
      this.claimPayToList = res;
    });

    this.getFileExtension();
  }

  getFileExtension() {
    this.fileValidatorService.getByValidatorType(ValidatorType.GroupClaimApprove).subscribe(res => {

      this.fileOption.validators = res;
    }, (error => {
      this.messageService.show(error.error.message, 'error');
    })
    );
  }

  onFileChange(event) {
    ;
    if (event && this.fileHandlerService.validator(event.target.files[0], this.fileOption)) {
      this.file = event.target.files[0];
      this.submitButton = true;
    }
    else {
      this.file = null;
      this.submitButton = false;
    }
  }

  saveAndAuthorize() {
    this.messageService.confirm(this.messageService.approveConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.approve(this.getFormData(this.enrollClaimForm.value)).subscribe(res => {
          this.messageService.show(this.messageService.approveSuccess, 'success');
          this.dialogRef.close("success");
        },
          err => {
            this.messageService.show(err.error.message, 'error');
          });
      }
    });

  }
  reject() {
    this.messageService.confirm(this.messageService.rejectConfirmation).then(con => {
      if (con.value === true) {
        this.validateEnrolService.reject(this.getFormData(this.enrollClaimForm.value)).subscribe(res => {
          this.messageService.show(this.messageService.rejectSuccess, 'success');
          this.dialogRef.close("success");
        }, err => {
          this.messageService.show(err.error.message, 'error');
        });
      }
    });
  }

  payTo(value) {

    if (value != 3) {
      this.fileUpload = true;
      this.submitButton = false;
    }
    else {
      this.fileUpload = false;
      this.submitButton = true;
    }
  }

  getFormData(entity) {
    var formData = new FormData();
    formData.append('model', JSON.stringify(entity));
    formData.append('docs', this.file);
    return formData;
  }

}
