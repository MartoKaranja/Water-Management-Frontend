import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkGeneratorComponent } from './bulk-generator.component';

describe('BulkGeneratorComponent', () => {
  let component: BulkGeneratorComponent;
  let fixture: ComponentFixture<BulkGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkGeneratorComponent]
    });
    fixture = TestBed.createComponent(BulkGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
