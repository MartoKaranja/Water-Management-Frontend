import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDashboardComponent } from './meter-dashboard.component';

describe('MeterDashboardComponent', () => {
  let component: MeterDashboardComponent;
  let fixture: ComponentFixture<MeterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterDashboardComponent]
    });
    fixture = TestBed.createComponent(MeterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
