import { Component, OnInit } from "@angular/core";
import { AuthService } from "./feature-module/auth/services/auth.service";
import { NavigateService } from "./utility/services/navigate/navigate.service";
import { StorageService } from "./utility/services/storage/storage.service";
import { NgxSpinnerService } from "ngx-spinner";
import { RouteUrl } from "./utility/configuration/routeUrl";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = "claims-payment";
  menus: any;
  IsLogIn = false;
  fullName: string;
  isSmallLogo:any; 

  constructor(
    private authService: AuthService,
    private navigateService: NavigateService,
    private storageService: StorageService
  ) {
    this.authService.getAuthenitication().subscribe(res => {
      this.menus = [];
      this.IsLogIn = res;
      this.fullName = "";
      if (this.IsLogIn) {
        this.fullName = this.storageService.getItem("fullName");
        this.menus = this.storageService.getItem("menus");
      }
    });
  }
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  logOut() {
    this.authService.signout();
  }
  changePassword() {
    this.navigateService.toChangePassword();
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    if (event.target.scrollTop > 80) {
      this.isSmallLogo = true;
    } else {
      this.isSmallLogo = false;
    }
  }
}
