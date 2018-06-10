import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tupu2Component } from './tupu2.component';

describe('Tupu2Component', () => {
  let component: Tupu2Component;
  let fixture: ComponentFixture<Tupu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tupu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tupu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
