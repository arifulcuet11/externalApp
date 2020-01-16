import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerModule } from "ngx-image-viewer";
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { FormsModule } from '@angular/forms';
import { NgmatModule } from '../ngmat/ngmat.module';

@NgModule({
  declarations: [
    DocViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ImageViewerModule.forRoot(),
    NgmatModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[DocViewerComponent]
})
export class DocViewerModule { }
