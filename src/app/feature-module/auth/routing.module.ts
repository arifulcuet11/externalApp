import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
 import { MenuComponent } from './menu/menu.component';
import { ApplicationUserListComponent } from './application-user-list/application-user-list.component';
import { RoleComponent } from './role/role.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

var routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'user-list',
    component: ApplicationUserListComponent,
  },
  {
    path: 'user',
    component: RegistrationComponent,
  },
  {
    path: 'user/:id',
    component: RegistrationComponent,
  },
  {
    path: 'role',
    component: RoleComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password/:hash',
    component: ForgetPasswordComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
