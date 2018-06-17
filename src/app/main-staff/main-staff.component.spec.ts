import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStaffComponent } from './main-staff.component';

describe('MainStaffComponent', () => {
  let component: MainStaffComponent;
  let fixture: ComponentFixture<MainStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
