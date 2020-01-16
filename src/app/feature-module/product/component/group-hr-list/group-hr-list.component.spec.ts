import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHRListComponent } from './group-hr-list.component';

describe('GroupHRListComponent', () => {
  let component: GroupHRListComponent;
  let fixture: ComponentFixture<GroupHRListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHRListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHRListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
