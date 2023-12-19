import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWidgetsComponent } from './admin-widgets.component';

describe('AdminWidgetsComponent', () => {
  let component: AdminWidgetsComponent;
  let fixture: ComponentFixture<AdminWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminWidgetsComponent]
    });
    fixture = TestBed.createComponent(AdminWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
