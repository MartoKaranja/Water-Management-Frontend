import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsumptionReportsComponent } from './user-consumption-reports.component';

describe('UserConsumptionReportsComponent', () => {
  let component: UserConsumptionReportsComponent;
  let fixture: ComponentFixture<UserConsumptionReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConsumptionReportsComponent]
    });
    fixture = TestBed.createComponent(UserConsumptionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
