import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaSettingsComponent } from './mpesa-settings.component';

describe('MpesaSettingsComponent', () => {
  let component: MpesaSettingsComponent;
  let fixture: ComponentFixture<MpesaSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MpesaSettingsComponent]
    });
    fixture = TestBed.createComponent(MpesaSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
