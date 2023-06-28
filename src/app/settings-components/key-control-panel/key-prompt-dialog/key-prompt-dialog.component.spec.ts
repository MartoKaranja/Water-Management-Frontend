import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPromptDialogComponent } from './key-prompt-dialog.component';

describe('KeyPromptDialogComponent', () => {
  let component: KeyPromptDialogComponent;
  let fixture: ComponentFixture<KeyPromptDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyPromptDialogComponent]
    });
    fixture = TestBed.createComponent(KeyPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
