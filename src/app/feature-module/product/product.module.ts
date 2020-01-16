import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgmatModule } from "src/app/shared-module/ngmat/ngmat.module";
import { RoutingModule } from "./routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ValidatingEnrolleeComponent } from './component/validating-enrollee/validating-enrollee.component';
import { CustomModule } from 'src/app/shared-module/custom/custom.module';
import { FileUploadModule } from "ng2-file-upload";
import { DocViewerModule } from 'src/app/shared-module/doc-viewer/doc-viewer.module';
import { GroupHRListComponent } from './component/group-hr-list/group-hr-list.component';
import { DialogGroupHrListComponent } from './component/group-hr-list/dialog-group-hr-list/dialog-group-hr-list.component';




@NgModule({
  declarations: [
    ValidatingEnrolleeComponent,
    GroupHRListComponent,
    DialogGroupHrListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgmatModule,
    RoutingModule,
    AngularFontAwesomeModule,
    FileUploadModule,
    CustomModule,
    DocViewerModule
  ],
  entryComponents: [DialogGroupHrListComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
