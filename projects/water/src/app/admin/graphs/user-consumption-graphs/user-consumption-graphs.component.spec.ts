import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsumptionGraphsComponent } from './user-consumption-graphs.component';

describe('UserConsumptionGraphsComponent', () => {
  let component: UserConsumptionGraphsComponent;
  let fixture: ComponentFixture<UserConsumptionGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConsumptionGraphsComponent]
    });
    fixture = TestBed.createComponent(UserConsumptionGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
