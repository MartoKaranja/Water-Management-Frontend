import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleQuestionsComponent } from './schedule-questions.component';

describe('ScheduleQuestionsComponent', () => {
  let component: ScheduleQuestionsComponent;
  let fixture: ComponentFixture<ScheduleQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
