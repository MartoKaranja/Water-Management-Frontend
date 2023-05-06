import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDbDetailsComponent } from './question-db-details.component';

describe('QuestionDbDetailsComponent', () => {
  let component: QuestionDbDetailsComponent;
  let fixture: ComponentFixture<QuestionDbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDbDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
