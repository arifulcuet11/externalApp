import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupHrListComponent } from './dialog-group-hr-list.component';

describe('DialogGroupHrListComponent', () => {
  let component: DialogGroupHrListComponent;
  let fixture: ComponentFixture<DialogGroupHrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGroupHrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGroupHrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
