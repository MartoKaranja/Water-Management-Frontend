import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksResultsDialogComponent } from './tasks-results-dialog.component';

describe('TasksResultsDialogComponent', () => {
  let component: TasksResultsDialogComponent;
  let fixture: ComponentFixture<TasksResultsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksResultsDialogComponent]
    });
    fixture = TestBed.createComponent(TasksResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
