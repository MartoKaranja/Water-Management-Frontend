import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedAnswersHistoryComponent } from './generated-answers-history.component';

describe('GeneratedAnswersHistoryComponent', () => {
  let component: GeneratedAnswersHistoryComponent;
  let fixture: ComponentFixture<GeneratedAnswersHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedAnswersHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedAnswersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
