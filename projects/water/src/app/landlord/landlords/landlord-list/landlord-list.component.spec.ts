import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordListComponent } from './landlord-list.component';

describe('LandlordListComponent', () => {
  let component: LandlordListComponent;
  let fixture: ComponentFixture<LandlordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordListComponent]
    });
    fixture = TestBed.createComponent(LandlordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
