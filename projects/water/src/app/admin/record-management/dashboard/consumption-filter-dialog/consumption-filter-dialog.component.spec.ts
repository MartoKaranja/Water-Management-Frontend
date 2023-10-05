import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionFilterDialogComponent } from './consumption-filter-dialog.component';

describe('ConsumptionFilterDialogComponent', () => {
  let component: ConsumptionFilterDialogComponent;
  let fixture: ComponentFixture<ConsumptionFilterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionFilterDialogComponent]
    });
    fixture = TestBed.createComponent(ConsumptionFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
