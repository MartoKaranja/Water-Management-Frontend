import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaymentDetailsDialogComponent } from './filter-payment-details-dialog.component';

describe('FilterPaymentDetailsDialogComponent', () => {
  let component: FilterPaymentDetailsDialogComponent;
  let fixture: ComponentFixture<FilterPaymentDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPaymentDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(FilterPaymentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
