import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentReportsSummaryComponent } from './user-payment-reports-summary.component';

describe('UserPaymentReportsSummaryComponent', () => {
  let component: UserPaymentReportsSummaryComponent;
  let fixture: ComponentFixture<UserPaymentReportsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentReportsSummaryComponent]
    });
    fixture = TestBed.createComponent(UserPaymentReportsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
