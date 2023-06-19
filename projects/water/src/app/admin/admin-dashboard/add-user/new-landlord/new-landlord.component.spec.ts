import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLandlordComponent } from './new-landlord.component';

describe('NewLandlordComponent', () => {
  let component: NewLandlordComponent;
  let fixture: ComponentFixture<NewLandlordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLandlordComponent]
    });
    fixture = TestBed.createComponent(NewLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
