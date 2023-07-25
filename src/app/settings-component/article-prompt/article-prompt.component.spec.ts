import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePromptComponent } from './article-prompt.component';

describe('ArticlePromptComponent', () => {
  let component: ArticlePromptComponent;
  let fixture: ComponentFixture<ArticlePromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePromptComponent]
    });
    fixture = TestBed.createComponent(ArticlePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
