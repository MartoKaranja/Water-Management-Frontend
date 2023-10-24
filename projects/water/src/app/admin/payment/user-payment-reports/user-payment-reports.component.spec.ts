import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentReportsComponent } from './user-payment-reports.component';

describe('UserPaymentReportsComponent', () => {
  let component: UserPaymentReportsComponent;
  let fixture: ComponentFixture<UserPaymentReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentReportsComponent]
    });
    fixture = TestBed.createComponent(UserPaymentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
