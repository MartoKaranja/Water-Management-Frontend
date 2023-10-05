import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionGraphsComponent } from './consumption-graphs.component';

describe('ConsumptionGraphsComponent', () => {
  let component: ConsumptionGraphsComponent;
  let fixture: ComponentFixture<ConsumptionGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionGraphsComponent]
    });
    fixture = TestBed.createComponent(ConsumptionGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
