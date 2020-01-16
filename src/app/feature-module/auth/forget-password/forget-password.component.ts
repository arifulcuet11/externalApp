import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MessageService } from 'src/app/utility/services/message/message.service';
import { NavigateService } from 'src/app/utility/services/navigate/navigate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  timeLeft = 70;
  subscribeTimer: any;
  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    token: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))]],
    confirmPassword: ['', [Validators.required, this.checkpassword]],
  });
  isOTPSend: boolean = false;
  isOTPExpired: boolean = false;
  message: string = "";
  email: string = null;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private navigateService: NavigateService) { }

  ngOnInit() {
    try {
      if (this.activatedRoute.snapshot.paramMap.get('hash')) {
        this.email = atob(this.activatedRoute.snapshot.paramMap.get('hash'));
        this.forgetPasswordForm.patchValue({ email: this.email });
        this.forgetPasswordForm.get("email").disable();
      }
    }
    catch (e) { }

  }
  checkpassword(fc: FormControl) {
    if (fc.parent) {
      if (fc.parent.get('password').value != fc.value) {
        return { 'mismatch': true }
      }
      else {
        return null;
      }
    } else {
      return null;
    }
  }

  submit(forgetPassForm: FormGroupDirective) {

    if (this.email) {
      this.forgetPasswordForm.value.email = this.email;
    }

    this.userService.resetPassword(this.forgetPasswordForm.value).subscribe(res => {
      this.messageService.show(this.messageService.resetSuccess, 'success');
      // this.reset(forgetPassForm);
      // this.resetTimer();
      // this.isOTPSend = false;
      // this.isOTPExpired = false;
      this.navigateService.toLogin();
    },
      err => {
        this.messageService.show(err.error.message, 'error');
      });
  }

  reset(formDirective: FormGroupDirective) {
    this.forgetPasswordForm.reset();
    formDirective.resetForm();
  }
  getResetPasswordOTP(event) {
    event.preventDefault();
    this.userService.sendResetPasswordOTP(this.forgetPasswordForm.controls['email'].value).subscribe(res => {
      // this.messageService.show(this.messageService.otpSendSuccess, 'success');
      this.isOTPSend = true;
      this.message = "OTP has been send to your phone number."
      this.startTimer();
    },
      err => {
        this.messageService.show(err.error.message, 'error');
      })
  }

  startTimer() {
    this.isOTPExpired = false;
    this.subscribeTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.resetTimer();
      }
    }, 1000);
  }
  resetTimer() {
    const email = this.forgetPasswordForm.controls["email"].value;
    this.forgetPasswordForm.reset({ "email": email })
    this.isOTPExpired = true;
    this.message = "OTP time has been expired."
    clearInterval(this.subscribeTimer);
  }
  isValidToShowInput() {
    if (this.isOTPSend == true && this.isOTPExpired == false) {
      return true;
    }
    return false;
  }
}
