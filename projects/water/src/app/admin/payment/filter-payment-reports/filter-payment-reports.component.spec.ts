import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaymentReportsComponent } from './filter-payment-reports.component';

describe('FilterPaymentReportsComponent', () => {
  let component: FilterPaymentReportsComponent;
  let fixture: ComponentFixture<FilterPaymentReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPaymentReportsComponent]
    });
    fixture = TestBed.createComponent(FilterPaymentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
