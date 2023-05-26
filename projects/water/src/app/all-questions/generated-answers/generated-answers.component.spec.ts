import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedAnswersComponent } from './generated-answers.component';

describe('GeneratedAnswersComponent', () => {
  let component: GeneratedAnswersComponent;
  let fixture: ComponentFixture<GeneratedAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
