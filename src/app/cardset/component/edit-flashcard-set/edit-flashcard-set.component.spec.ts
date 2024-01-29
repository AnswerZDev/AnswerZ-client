import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlashcardSetComponent } from './edit-flashcard-set.component';

describe('EditFlashcardSetComponent', () => {
  let component: EditFlashcardSetComponent;
  let fixture: ComponentFixture<EditFlashcardSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFlashcardSetComponent]
    });
    fixture = TestBed.createComponent(EditFlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
