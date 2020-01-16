import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageCheck'
})
export class LanguageCheckPipe implements PipeTransform {

  transform(value: any): any {
    var pattern = /[\u000-\u007F]+/g;
    var result = value.match(/[\u000-\u007F]+/g);
    console.log('result-', result);
    return result;
  }

}
