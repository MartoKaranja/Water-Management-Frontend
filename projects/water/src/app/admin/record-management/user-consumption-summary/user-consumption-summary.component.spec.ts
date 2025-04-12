import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsumptionSummaryComponent } from './user-consumption-summary.component';

describe('UserConsumptionSummaryComponent', () => {
  let component: UserConsumptionSummaryComponent;
  let fixture: ComponentFixture<UserConsumptionSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConsumptionSummaryComponent]
    });
    fixture = TestBed.createComponent(UserConsumptionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
