import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMonthSummaryComponent } from './current-month-summary.component';

describe('CurrentMonthSummaryComponent', () => {
  let component: CurrentMonthSummaryComponent;
  let fixture: ComponentFixture<CurrentMonthSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentMonthSummaryComponent]
    });
    fixture = TestBed.createComponent(CurrentMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
