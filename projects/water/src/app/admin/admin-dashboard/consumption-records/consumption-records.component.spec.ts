import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionRecordsComponent } from './consumption-records.component';

describe('ConsumptionRecordsComponent', () => {
  let component: ConsumptionRecordsComponent;
  let fixture: ComponentFixture<ConsumptionRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionRecordsComponent]
    });
    fixture = TestBed.createComponent(ConsumptionRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
