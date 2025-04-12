import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyViewComponent } from './monthly-view.component';

describe('MonthlyViewComponent', () => {
  let component: MonthlyViewComponent;
  let fixture: ComponentFixture<MonthlyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyViewComponent]
    });
    fixture = TestBed.createComponent(MonthlyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
