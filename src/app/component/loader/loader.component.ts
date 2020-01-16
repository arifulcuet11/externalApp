import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/utility/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {



  bdColor="rgba(51,51,51,0.8)";
  size="medium";
  color="#fff";
  type="ball-spin-clockwise";

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.color = "#4dbad1";
    this.size = this.loaderService.size.medium;
    this.type = this.loaderService.type.ballSpinClockwise;
  }

}
