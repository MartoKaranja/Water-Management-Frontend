import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePromptDialogComponent } from './article-prompt-dialog.component';

describe('ArticlePromptDialogComponent', () => {
  let component: ArticlePromptDialogComponent;
  let fixture: ComponentFixture<ArticlePromptDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePromptDialogComponent]
    });
    fixture = TestBed.createComponent(ArticlePromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
