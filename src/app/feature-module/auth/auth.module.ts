import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgmatModule } from 'src/app/shared-module/ngmat/ngmat.module'; import { MenuComponent } from './menu/menu.component';
import { ApplicationUserListComponent } from './application-user-list/application-user-list.component';
import { RoleComponent } from './role/role.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CustomModule } from 'src/app/shared-module/custom/custom.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
     MenuComponent,
    ApplicationUserListComponent,
    RoleComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgmatModule,
    RoutingModule,
    CustomModule
  ]
})
export class AuthModule { }
