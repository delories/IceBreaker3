import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TupuComponent } from './tupu.component';

describe('TupuComponent', () => {
  let component: TupuComponent;
  let fixture: ComponentFixture<TupuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TupuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TupuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
