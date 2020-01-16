import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyEng]'
})
export class OnlyEnglishDirective {

  pattern = /[\u008F-\uFFFF]+/g;
  constructor() { }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent){
    let value:string = event.target['value'];
    let matchValue: any = value.match(this.pattern);

    if(matchValue != null){
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPast(event: ClipboardEvent){
    let value = event.clipboardData.getData('text/plain');
    let matchValue: any = value.match(this.pattern);

    if(matchValue != null){
      event.preventDefault();
    }
  }
}
