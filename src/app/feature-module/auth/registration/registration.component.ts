import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { ValidatingEnroleeMessage } from 'src/app/utility/services/message/custom-messages';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  isOtp: boolean = false;
  totalStep: number = 3;
  currentStep: number = 1;
  isConfirm: boolean = false;
  enrolId: number = 0;
  isEmailVaried: boolean = false;
  subscribeTimer: any;
  customMessage = new ValidatingEnroleeMessage();
  emailNotFound: any;

  enrol: any;
  timeLeft = 120;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) { }

  regForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  regForm2 = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.checkpassword]],
  });
  otpForm = this.fb.group({
    otpNumber: [null, [Validators.required]]
  });

  ngOnInit() {
    localStorage.setItem("HashNumber", Math.random().toString());
  }

  checkUserByEmail() {
    const email = this.regForm.controls['email'].value;
    const res = this.authService.checkUserExistByEmail(email).subscribe(res => {
      if (res != null) {
        this.isOtp = true;
        this.enrol = res;
        this.enrolId = res['id'];
        this.startTimer();
        this.isEmailVaried = true;
        this.currentStep = 2;
        localStorage.removeItem('HashNumber');
      }
      else {
        this.emailNotFound = 'Email not found.';
      }
    }, error => {
      this.messageService.show(error.error.message, 'error');
    });
  }

  verifyOTP() {
    const otp = this.otpForm.controls['otpNumber'].value;
    localStorage.setItem("HashNumber", Math.random().toString());
    this.authService.ValidateOtp(otp, this.enrolId).subscribe(res => {
      localStorage.removeItem('HashNumber');
      if (res) {
        this.isOtp = false;
        this.isConfirm = true;
        this.currentStep = 3;
        this.regForm2.patchValue({
          email: this.enrol.email
        })
      }
      else{
      
        this.messageService.show("Invalied Otp", 'error');
      }
    }), (err => {
      localStorage.removeItem('HashNumber');
      this.messageService.show(err.error.message, 'error');
    })
  }
  startTimer() {
    this.subscribeTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft == 0) {
        this.clearTimer();
        this.isOtp = false;
        this.timeLeft = 120;
        this.currentStep = 1;
        this.isEmailVaried = false;
        this.otpForm.reset();
        localStorage.clear();
        this.messageService.show(this.customMessage.otpTimeExpire, 'error');
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.subscribeTimer);
  }


  checkpassword(fc: FormControl) {
    if (fc.parent) {
      if (fc.parent.get('password').value != fc.value) {
        return { mismatch: true };
      } else {
        return null;
      }
    } else {
      return null;
    }

  }


  submit(refRegForm: FormGroupDirective) {
    this.authService.signup(this.regForm2.value).subscribe(
      (res => {
        localStorage.removeItem('HashNumber');
        if (this.regForm2.contains('password')) {
          this.authService.signin(this.regForm2.controls['email'].value, this.regForm2.controls['password'].value);
        } else {
          this.messageService.show(this.messageService.msgSave, 'success');
          this.reset(refRegForm);
        }
      }),
      (err => {
        this.messageService.show(err.error.message, 'error');
      })
    );

  }

  reset(formDirective: FormGroupDirective) {
    this.regForm.reset();
    this.currentStep = 1;
    formDirective.resetForm();
  }
  ngOnDestroy(): void {
    this.clearTimer();
    localStorage.removeItem('HashNumber');
  }
}
