import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseQuestionsComponent } from './database-questions.component';

describe('DatabaseQuestionsComponent', () => {
  let component: DatabaseQuestionsComponent;
  let fixture: ComponentFixture<DatabaseQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
