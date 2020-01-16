import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from 'src/app/utility/services/storage/storage.service';
import { NavigateService } from 'src/app/utility/services/navigate/navigate.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private navigate: NavigateService
    ) { }

  ngOnInit() {
    if (!this.authService.IsTokenExpire()) {
       this.navigate.toHome();

    }

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  login() {
    this.authService.signin(this.authForm.controls['email'].value, this.authForm.controls['password'].value);
  }

  signup() {
    this.navigate.toSignUp();
  }
  forgetPassword() {
    this.navigate.toForgetPassword();

  }
  submitClaim(){
    this.navigate.toOnlineGroupSubmission();
  }
}
