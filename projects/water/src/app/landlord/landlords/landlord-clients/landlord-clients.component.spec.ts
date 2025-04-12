import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordClientsComponent } from './landlord-clients.component';

describe('LandlordClientsComponent', () => {
  let component: LandlordClientsComponent;
  let fixture: ComponentFixture<LandlordClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordClientsComponent]
    });
    fixture = TestBed.createComponent(LandlordClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
