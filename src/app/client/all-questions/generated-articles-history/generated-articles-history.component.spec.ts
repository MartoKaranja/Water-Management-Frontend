import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedArticlesHistoryComponent } from './generated-articles-history.component';

describe('GeneratedArticlesHistoryComponent', () => {
  let component: GeneratedArticlesHistoryComponent;
  let fixture: ComponentFixture<GeneratedArticlesHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratedArticlesHistoryComponent]
    });
    fixture = TestBed.createComponent(GeneratedArticlesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
