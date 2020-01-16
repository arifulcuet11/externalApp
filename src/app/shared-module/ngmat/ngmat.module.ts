import { NgModule, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateModule } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const CLAIMS_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class CliamsDateAdapter extends MomentDateAdapter{

  mdata: moment.Moment | null;
  parse(value: any, parseFormat: string | string[]){
      if(value.split('/').length !== 3 || value.length<8 || (value.split('/').length == 3 && value.split('/')[2].length!==4)){
        // this.parse(moment(new Date()).format('DD/MM/YYYY'), 'DD/MM/YYYY')
        value = '';
      }
      let dt = moment(value, parseFormat);
      return dt;
  }
  // isValid(date: Moment): boolean {
  //   debugger;
  //  var x =  moment(date, 'DD/MM/YYYY', true);
  //  var y = date.isValid();
  //   if(date.isValid()){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

//   _onInput(value) {
//     debugger;
//    this.isValid(value);
// }
}


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule,
  MatTreeModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatRippleModule,
  MatToolbarModule,
  MatIconModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,
  MatDividerModule,
  DateAdapter,
  MAT_DATE_FORMATS

} from '@angular/material';
import { Moment } from 'moment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MomentDateModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
  ],

  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: DateAdapter, useClass: CliamsDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CLAIMS_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class NgmatModule {

}


