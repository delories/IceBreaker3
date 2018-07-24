import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosShowComponent } from './infos-show.component';

describe('InfosShowComponent', () => {
  let component: InfosShowComponent;
  let fixture: ComponentFixture<InfosShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
