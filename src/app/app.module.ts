import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule, Injector } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./feature-module/auth/auth.module";
import { HomeComponent } from "./component/home/home.component";
import { LoaderComponent } from "./component/loader/loader.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "./utility/configuration/interceptor/HttpConfigInterceptor";
import { NgmatModule } from "./shared-module/ngmat/ngmat.module";
import { ProductModule } from "./feature-module/product/product.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { CustomModule } from "./shared-module/custom/custom.module";
import { DocViewerModule } from "./shared-module/doc-viewer/doc-viewer.module";

export let InjectorInstance: Injector;
@NgModule({
  declarations: [AppComponent, HomeComponent, LoaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgmatModule,
    AuthModule,
    ProductModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    CustomModule,
    DocViewerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) 
  {
    InjectorInstance = this.injector;
  }
}
