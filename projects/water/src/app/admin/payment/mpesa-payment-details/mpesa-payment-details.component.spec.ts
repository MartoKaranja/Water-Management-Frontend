import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaPaymentDetailsComponent } from './mpesa-payment-details.component';

describe('MpesaPaymentDetailsComponent', () => {
  let component: MpesaPaymentDetailsComponent;
  let fixture: ComponentFixture<MpesaPaymentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MpesaPaymentDetailsComponent]
    });
    fixture = TestBed.createComponent(MpesaPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
