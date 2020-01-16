import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { ValidatingEnrolleeComponent } from "./component/validating-enrollee/validating-enrollee.component";
import { DocViewerComponent } from "src/app/shared-module/doc-viewer/doc-viewer/doc-viewer.component";
import { GroupHRListComponent } from './component/group-hr-list/group-hr-list.component';
;

const routes: Route[] = [
  {
    path: "validating-enrollee",
    component: ValidatingEnrolleeComponent
  },
  {
    path: "doc-view",
    component: DocViewerComponent
  },
  {
    path: "group-hr-list",
    component: GroupHRListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
