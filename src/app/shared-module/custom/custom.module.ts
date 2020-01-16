import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteConversionPipe } from 'src/app/utility/pipe/minute-conversion/minute-conversion.pipe';
import { LanguageCheckPipe } from 'src/app/utility/pipe/language-check/language-check.pipe';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { LocalTimePipe } from 'src/app/utility/pipe/local-time/local-time.pipe';
import { CustomMaxDirective } from 'src/app/utility/directive/custom-max/custom-max-validator.directive';
import { CustomMinDirective } from 'src/app/utility/directive/custom-min/custom-min-validator.directive';
import { OnlyEnglishDirective } from 'src/app/utility/directive/language-check/only-english.directive';
import { FilterListPipe } from 'src/app/utility/pipe/filter-list/filter-list.pipe';
import { ReversePipe } from 'src/app/utility/pipe/reverse';

@NgModule({
  declarations: [
    MinuteConversionPipe, 
    LanguageCheckPipe,
    LocalTimePipe, 
    CustomMaxDirective,
    CustomMinDirective,
    OnlyEnglishDirective,
    FilterListPipe,
    ReversePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MinuteConversionPipe,
    LanguageCheckPipe,
    LocalTimePipe,
    CustomMaxDirective,
    CustomMinDirective,
    OnlyEnglishDirective,
    FilterListPipe,
    ReversePipe
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class CustomModule { }