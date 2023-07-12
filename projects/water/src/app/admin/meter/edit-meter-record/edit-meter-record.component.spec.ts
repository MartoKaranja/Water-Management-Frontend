import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeterRecordComponent } from './edit-meter-record.component';

describe('EditMeterRecordComponent', () => {
  let component: EditMeterRecordComponent;
  let fixture: ComponentFixture<EditMeterRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMeterRecordComponent]
    });
    fixture = TestBed.createComponent(EditMeterRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
