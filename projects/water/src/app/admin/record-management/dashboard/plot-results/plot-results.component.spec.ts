import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotResultsComponent } from './plot-results.component';

describe('PlotResultsComponent', () => {
  let component: PlotResultsComponent;
  let fixture: ComponentFixture<PlotResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlotResultsComponent]
    });
    fixture = TestBed.createComponent(PlotResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
