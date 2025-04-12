import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualViewComponent } from './annual-view.component';

describe('AnnualViewComponent', () => {
  let component: AnnualViewComponent;
  let fixture: ComponentFixture<AnnualViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualViewComponent]
    });
    fixture = TestBed.createComponent(AnnualViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
