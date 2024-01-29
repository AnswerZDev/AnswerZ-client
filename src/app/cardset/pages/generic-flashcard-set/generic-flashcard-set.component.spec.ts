import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFlashcardSetComponent } from './generic-flashcard-set.component';

describe('GenericFlashcardSetComponent', () => {
  let component: GenericFlashcardSetComponent;
  let fixture: ComponentFixture<GenericFlashcardSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericFlashcardSetComponent]
    });
    fixture = TestBed.createComponent(GenericFlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
