import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReportsSummaryComponent } from './payment-reports-summary.component';

describe('PaymentReportsSummaryComponent', () => {
  let component: PaymentReportsSummaryComponent;
  let fixture: ComponentFixture<PaymentReportsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentReportsSummaryComponent]
    });
    fixture = TestBed.createComponent(PaymentReportsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
