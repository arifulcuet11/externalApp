import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { ValidateEnrolService } from '../../service/validating-enrollee/validate-enrol.service';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { timer } from 'rxjs';
import { IFileOptions, FileHandlerService } from 'src/app/utility/services/file-handler/file-handler.service';
import { ValidatingEnroleeMessage } from 'src/app/utility/services/message/custom-messages';
import { FileValidatorService } from '../../service/file-validator/file-validator.service';
import { ValidatorType } from 'src/app/utility/enum/global-enum';
@Component({
  selector: 'app-validating-enrollee',
  templateUrl: './validating-enrollee.component.html',
  styleUrls: ['./validating-enrollee.component.scss']
})
export class ValidatingEnrolleeComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private validateEnrolService: ValidateEnrolService,
    private messageService: MessageService,
    private fileHandlerService: FileHandlerService,
    private fileValidatorService: FileValidatorService,
  ) { }
  public static validatingFromDirective: FormGroupDirective;
  pattern = '^[0-9]{1,6}';
  selectedTab = 0;
  otpFlag = false;
  timeLeft = 120;
  private browserId: string;
  subscribeTimer: any;
  message: any;
  isOtpGenerate = false;
  isDocSubmission = true;
  productList: any = [];
  relationList: any = [];
  enrolId: any;
  dependentProducts: any = [];
  isRegionCheck = true;
  fileExtends: IFileExtend[];
  otpFromDirective: FormGroupDirective;
  validateFromDirective: FormGroupDirective;
  generatingFromDirective: FormGroupDirective;
  customMessage = new ValidatingEnroleeMessage();
  fileOption: IFileOptions = { acctptedTypes: '' };

  fileValidators: any;

  tab = [
    {
      name: 'Validating Enrollee Data',
      disabled: false
    },
    {
      name: 'Generating Input',
      disabled: true
    },
    {
      name: 'Document Upload',
      disabled: true
    }
  ];

  validatingEnrolleForm = this.fb.group({
    groupPolicyNo: [null, [Validators.required]],
    certificateNo: [null, [Validators.required]],
    birthYear: [null, [Validators.required, Validators.pattern(this.pattern)]],
  });

  generatingImputForm = this.fb.group({
    groupPolicyNo: [null],
    certificateNo: [null],
    birthYear: [null],
    productId: [null, [Validators.required]],
    insuredName: [null],
    relationId: [null],
    enrolDependentId: [0],
    natureOfSickness: [null],
    enrolId: [null],
    componentValidatorId: [null],
    claimAmount: [null, [Validators.required, Validators.pattern('^[0-9]{1,18}')]],
  });
  otpForm = this.fb.group({
    otpNumber: [null, [Validators.required]],
    enrolId: [0]
  });

  ngOnInit() {
    // this.oberserableTimer();
    this.timeLeft = this.customMessage.otpLeftTime;
    this.getFileExtension();
  }

  getFileExtension() {
    this.fileValidatorService.getByValidatorType(ValidatorType.GroupClaimSubmission).subscribe(res => {
       this.fileOption.validators = res;
    }, (error => {
      this.messageService.show(error.error.message, 'error');
    })
    );
  }
  genarateOTP() {
    this.otpFlag = false;
    const entity = this.validatingEnrolleForm.value;
    this.validateEnrolService.findClaim(entity.groupPolicyNo, entity.birthYear, entity.certificateNo).subscribe(res => {
        this.otpFlag = true;
        this.isOtpGenerate = !this.isOtpGenerate;
        this.message = res.msg;
        this.enrolId = res.data.res[0].id;
        this.browserId = res.data.browserId;
        this.startTimer();
        this.generatingImputForm.patchValue(
          {
            groupPolicyNo: entity.groupPolicyNo,
            certificateNo: entity.certificateNo,
            birthYear: entity.birthYear,
            enrolId: res.data.res[0].id,
          }
        );

        this.otpForm.patchValue(
          {
            enrolId: res.data.res[0].id
          }
        );

    }, (error => {
      this.messageService.show(error.error.message, 'error');
    })
    );
  }

  dependentChange(event: any){
    // if(event.value !=0){
    //   this.generatingImputForm.patchValue({
    //     enrolId : null
    //   });
    // }
    // else{
    //   this.generatingImputForm.patchValue({
    //     enrolId : this.enrolId
    //   });
    // }
  }

  verifyOTP(formDirective1: FormGroupDirective, formDirective2: FormGroupDirective) {
    this.otpFromDirective = formDirective2;
    this.validateFromDirective = formDirective1;
    const entity = this.otpForm.value;
    this.validateEnrolService.otpValidation(entity.otpNumber, entity.enrolId).subscribe(res => {
        this.productList = res.data.enrolproducts;
        this.relationList = res.data.relations;
        this.dependentProducts = res.data.dependentProducts;

        this.generatingImputForm.patchValue(
          {
            insuredName: res.data.insureName
          }
        );
        this.tab[1].disabled = false;
        this.tab[0].disabled = true;
        this.selectedTab = 1;
        this.clearTimer();

    }, (error => {
      this.messageService.show(error.error.message, 'error');
    }));
  }

  GetClaimDocuments() {
    this.fileExtends = [];
    const entity = this.generatingImputForm.value;
    this.validateEnrolService.getClaimDocuments(entity.productId, this.browserId).subscribe(res => {

      this.selectedTab = 2;
      this.tab[2].disabled = false;
      this.tab[1].disabled = true;
      res.data.forEach(item => {
        this.fileExtends.push({
          documentId: item.documnetTypeID,
          docName: item.documnetTypeName,
          file: null,
          acctptedTypes: '',
          index: 1
        });
      });
    }, (error => {
      this.messageService.show(error.error.message, 'error');
    }));
  }

  startTimer() {
    this.subscribeTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft == 0) {
        this.clearTimer();
        this.otpFlag = false;
        this.timeLeft = this.customMessage.otpLeftTime;
        this.isOtpGenerate = false;
        this.messageService.show(this.customMessage.otpTimeExpire, 'error');
        this.otpFromDirective.resetForm();
        this.otpForm.reset();

      }
    }, 1000);
  }

  clearTimer() {
    this.timeLeft = this.customMessage.otpLeftTime;
    clearInterval(this.subscribeTimer);
  }


  onFileChange(event, item: IFileExtend) {

    if (event && this.fileHandlerService.validator(event.target.files[0], this.fileOption)) {
      item.file = event.target.files[0];
      this.docReqValidation();
    }
  }


  submit(formDirective: FormGroupDirective) {
    this.generatingFromDirective = formDirective;
    this.validateEnrolService.add(this.getFormData()).subscribe(res => {
      this.resetFrom();
      this.messageService.show(this.customMessage.claimSubmissionMessage, 'success');
    }, (err => {
      this.messageService.show(err.error.message, 'error');
    }));
  }

  addDocument(item: IFileExtend) {

    let indx = 0;
    const obj = this.fileExtends.filter(x => x.documentId === item.documentId);
    obj.forEach(element => {
      if (element.index > indx) {
        indx = element.index;
      }
    });

    this.fileExtends.push({
      documentId: item.documentId,
      docName: item.docName,
      file: null,
      acctptedTypes: '',
      index: indx + 1,
    });

    this.fileExtends = this.fileExtends.sort((t1, t2) => {
      if (t1.documentId > t2.documentId) { return 1; }
      if (t1.documentId < t2.documentId) { return -1; }
      return 0;
    });
    this.docReqValidation();
  }

  removeDocument(item: IFileExtend) {
    this.fileExtends = this.fileExtends.filter(x => x !== item);
    this.docReqValidation();
  }

  getFormData() {
    const entity = this.generatingImputForm.value;
    entity.enrolId = this.enrolId;
    entity.componentValidatorId = ValidatorType.GroupClaimSubmission;
    entity.browserId = this.browserId;
    entity.enrolDependentId = entity.enrolDependentId === 0 ? null : entity.enrolDependentId;
    const docs = this.fileExtends.map(x => x.documentId.toString() + '-' + x.index.toString());
    const formData = new FormData();
    formData.append('model', JSON.stringify(entity));
    formData.append('docs', JSON.stringify(docs));
    this.fileExtends.forEach(x => formData.append(x.documentId.toString() + '-' + x.index.toString(), x.file));
    return formData;

  }

  changeStatus(event: any) {
    this.isRegionCheck = !event.checked;
  }

  resetFrom() {
    this.generatingFromDirective.resetForm();
    this.validateFromDirective.resetForm();
    this.otpFromDirective.resetForm();
    this.validatingEnrolleForm.reset();
    this.otpForm.reset();
    this.generatingImputForm.reset();
    this.tab[0].disabled = false;
    this.tab[1].disabled = true;
    this.tab[2].disabled = true;
    this.selectedTab = 0;
    this.otpFlag = false;
    this.timeLeft = this.customMessage.otpLeftTime;
    this.isOtpGenerate = false;
    this.isDocSubmission = true;
  }

  docReqValidation() {
    const rfile = this.fileExtends.length;
    let ufile = 0;
    this.fileExtends.forEach(x => {
      if (x.file != null) {
        ufile++;
      }
    });

    if (rfile === ufile) {
      this.isDocSubmission = false;
    } else {
      this.isDocSubmission = true;
    }
  }
}

interface IFileExtend {

  documentId: number;
  index: number;
  docName: string;
  acctptedTypes: string;
  file: File;
  contentTypes?: string;

}
