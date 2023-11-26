import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlashcardComponent } from './edit-flashcard.component';

describe('EditFlashcardComponent', () => {
  let component: EditFlashcardComponent;
  let fixture: ComponentFixture<EditFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFlashcardComponent]
    });
    fixture = TestBed.createComponent(EditFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
