import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyControlPanelComponent } from './key-control-panel.component';

describe('KeyControlPanelComponent', () => {
  let component: KeyControlPanelComponent;
  let fixture: ComponentFixture<KeyControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyControlPanelComponent]
    });
    fixture = TestBed.createComponent(KeyControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
