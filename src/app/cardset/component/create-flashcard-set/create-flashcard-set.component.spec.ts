import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlashcardSetComponent } from './create-flashcard-set.component';

describe('CreateFlashcardSetComponent', () => {
  let component: CreateFlashcardSetComponent;
  let fixture: ComponentFixture<CreateFlashcardSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFlashcardSetComponent]
    });
    fixture = TestBed.createComponent(CreateFlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
