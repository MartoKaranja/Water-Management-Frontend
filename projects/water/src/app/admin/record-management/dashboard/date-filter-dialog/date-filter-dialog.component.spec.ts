import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterDialogComponent } from './date-filter-dialog.component';

describe('DateFilterDialogComponent', () => {
  let component: DateFilterDialogComponent;
  let fixture: ComponentFixture<DateFilterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateFilterDialogComponent]
    });
    fixture = TestBed.createComponent(DateFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
