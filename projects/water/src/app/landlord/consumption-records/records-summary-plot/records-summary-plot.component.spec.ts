import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsSummaryPlotComponent } from './records-summary-plot.component';

describe('RecordsSummaryPlotComponent', () => {
  let component: RecordsSummaryPlotComponent;
  let fixture: ComponentFixture<RecordsSummaryPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsSummaryPlotComponent]
    });
    fixture = TestBed.createComponent(RecordsSummaryPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
