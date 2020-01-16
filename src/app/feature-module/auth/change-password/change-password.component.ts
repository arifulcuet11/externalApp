import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MessageService } from 'src/app/utility/services/message/message.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // matcher = new MyErrorStateMatcher();

  changePasswordForm = this.fb.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))]],
    confirmPassword: ['', [Validators.required, this.checkpassword]],
  });

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
  }
  checkpassword(fc: FormControl) {
    if (fc.parent) {
      if (fc.parent.get('newPassword').value != fc.value) {
        return { 'mismatch': true }
      }
      else {
        return null;
      }
    } else {
      return null;
    }
  }

  submit(changePassForm: FormGroupDirective) {

    this.userService.changePassword(this.changePasswordForm.value).subscribe(res => {
      this.messageService.show(this.messageService.msgUpdate, 'success');
      this.reset(changePassForm);
    },
      err => {
        this.messageService.show(err.error.message, 'error');
      });
  }

  reset(formDirective: FormGroupDirective) {
    this.changePasswordForm.reset();
    formDirective.resetForm();
  }

}

