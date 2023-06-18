import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterRecordsComponent } from './meter-records.component';

describe('MeterRecordsComponent', () => {
  let component: MeterRecordsComponent;
  let fixture: ComponentFixture<MeterRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterRecordsComponent]
    });
    fixture = TestBed.createComponent(MeterRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
