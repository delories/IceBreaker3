import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheInvestmentComponent } from './the-investment.component';

describe('TheInvestmentComponent', () => {
  let component: TheInvestmentComponent;
  let fixture: ComponentFixture<TheInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
