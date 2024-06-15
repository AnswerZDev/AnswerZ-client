import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFlashcardComponent } from './play-flashcard.component';

describe('PlayFlashcardComponent', () => {
  let component: PlayFlashcardComponent;
  let fixture: ComponentFixture<PlayFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayFlashcardComponent]
    });
    fixture = TestBed.createComponent(PlayFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
