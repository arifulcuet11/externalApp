import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatingEnrolleeComponent } from './validating-enrollee.component';

describe('ValidatingEnrolleeComponent', () => {
  let component: ValidatingEnrolleeComponent;
  let fixture: ComponentFixture<ValidatingEnrolleeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatingEnrolleeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatingEnrolleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
