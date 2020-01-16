import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  isDevMode,
  ViewChild,
  ElementRef
} from "@angular/core";
import $ from "jquery";
import { DocViewerService } from "../service/doc-viewer.service";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: "app-doc-viewer",
  templateUrl: "./doc-viewer.component.html",
  styleUrls: ["./doc-viewer.component.scss"]
})
export class DocViewerComponent  {
  // @Input() view: any;
  @Input() urls: any;
  @Input('rheight') rheight: string;
  @ViewChild('imgviewer', { static: false }) child: ElementRef;
  isTiff = false;
  isImage = false;
  // urls: any = ['http://localhost:61220/Assets/Release/1003_C-3001_A-001/1908A-00100014/METCLDR06_DiagnosisReports_1.docx',
  // 'http://localhost:61220/Assets/DocumentType/69b4292b-30ee-4d6d-abf1-83f7af600944_download.jpg',
  //   'http://localhost:61220/Assets/DocumentType/abc.pdf']

  convertExtension = [] = ["docx","doc","DOCX","DOC","tiff","tif","TIFF","TIF"];
  docViewer: DocViewer;
  configure: ImageViewerConfig;
  images: any = [];
  endPointUrl = "http://localhost:61220";
  constructor(private docViewerService: DocViewerService) { }
  ngOnInit(): void {
    this.docViewer = new DocViewer();
    setTimeout(() => {
      this.docViewer.urls = this.urls;
      if(this.docViewer.urls.length>0){
        const extension = this.findExtension(this.docViewer.urls[this.docViewer.currentIndex]);
        this.configure = this.docViewer.config;
        if (extension == "tiff" || extension == "tif" || extension=="docx" || extension == "doc") {
          this.tiffToPdf(this.docViewer.urls[this.docViewer.currentIndex]);
        } else {
          this.docShow(extension, this.docViewer.urls[this.docViewer.currentIndex]);
        }
      }
      this.setHeight(
        this.child.nativeElement.querySelectorAll(".img-container")
      );
      this.setHeight(this.child.nativeElement.querySelectorAll(".pdfviewer"));
    }, 10);

  }

  setHeight(viewer: any) {
    if (viewer != null) {
      const elem = viewer[0] as HTMLElement;
      elem.style.height = this.rheight ? this.rheight : "70vh";
    }
  }

  tiffToPdf(url: any) {
    this.docViewerService.get(url).subscribe(
      res => {
       let ext = this.findExtension(res);
        this.docShow(ext, res);
      },
      error => { }
    );
  }

  docShow(extension: string, url: any) {
    let ext =extension.toLocaleLowerCase();
    if(ext =="docx" || ext=="doc" || ext =="tiff" || ext =="tif")
    {
       this.tiffToPdf(url);
    }
   else if (ext == "pdf") {
      this.setViewer(false, true);
      $("#pdf_preview").attr("src", url);
    } else {
      this.setViewer(true, false);
      this.imageShow(url);
    }
  }
  findExtension(url: any) {
    let ext = url.split(".").pop();
    ext = ext.toLowerCase();
    return ext;
  }

  setViewer(img: boolean, tiff: boolean) {
    this.isTiff = tiff;
    this.isImage = img;
  }
  imageShow(image: any) {
    this.images = [];
    this.images.push(image);
  }

  next(){
     if(this.docViewer.urls.length>this.docViewer.currentIndex){
      const extension = this.findExtension(this.docViewer.urls[++this.docViewer.currentIndex]);
      this.docShow(extension, this.docViewer.urls[this.docViewer.currentIndex]);
     }
  }
  previous(){
    if(this.docViewer.currentIndex>0){
      const extension = this.findExtension(this.docViewer.urls[--this.docViewer.currentIndex]);
      this.docShow(extension, this.docViewer.urls[this.docViewer.currentIndex]);
     }
  }
}
export class ImageViewerConfig {
  btnClass: string;
  zoomFactor: number; // The amount that the scale will be increased by
  containerBackgroundColor: string; // The color to use for the background. This can provided in hex, or rgb(a).
  wheelZoom: boolean; // If true, the mouse wheel can be used to zoom in
  allowFullscreen: boolean; // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
  allowKeyboardNavigation: boolean; // If true, the left / right arrow keys can be used for navigation
  btnIcons: any = {
    zoomIn: "fa fa-plus",
    zoomOut: "fa fa-minus",
    rotateClockwise: "fa fa-repeat",
    rotateCounterClockwise: "fa fa-undo",
    next: "fa fa-arrow-right",
    prev: "fa fa-arrow-left",
    fullscreen: "fa fa-arrows-alt"
  }; // The icon classes that will apply to the buttons. By default, font-awesome is used.
  btnShow: any = {};
  constructor() {
    this.btnClass = "default";
    (this.zoomFactor = 0.1),
      (this.containerBackgroundColor = "#ccc"),
      (this.wheelZoom = true),
      (this.allowFullscreen = true),
      (this.allowKeyboardNavigation = true),
      (this.btnIcons = {
        zoomIn: "fa fa-plus",
        zoomOut: "fa fa-minus",
        rotateClockwise: "fa fa-repeat",
        rotateCounterClockwise: "fa fa-undo",
        next: "fa fa-arrow-right",
        prev: "fa fa-arrow-left",
        fullscreen: "fa fa-arrows-alt"
      }),
      (this.btnShow = {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: false,
        rotateCounterClockwise: true,
        next: false,
        prev: false
      });
  }
}

export class DocViewer {
  url: string;
  currentIndex: number;
  urls:any;
  config: ImageViewerConfig;
  constructor() {
    this.config = new ImageViewerConfig();
    this.url = "";
    this.urls =[];
    this.currentIndex = 0;
  }
}
