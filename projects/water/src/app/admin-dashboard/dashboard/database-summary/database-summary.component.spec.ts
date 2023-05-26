import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseSummaryComponent } from './database-summary.component';

describe('DatabaseSummaryComponent', () => {
  let component: DatabaseSummaryComponent;
  let fixture: ComponentFixture<DatabaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
