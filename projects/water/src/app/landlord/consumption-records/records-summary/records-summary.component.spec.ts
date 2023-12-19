import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsSummaryComponent } from './records-summary.component';

describe('RecordsSummaryComponent', () => {
  let component: RecordsSummaryComponent;
  let fixture: ComponentFixture<RecordsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsSummaryComponent]
    });
    fixture = TestBed.createComponent(RecordsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
