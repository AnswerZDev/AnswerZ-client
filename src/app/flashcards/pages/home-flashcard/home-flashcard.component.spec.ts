import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFlashcardComponent } from './home-flashcard.component';

describe('HomeFlashcardComponent', () => {
  let component: HomeFlashcardComponent;
  let fixture: ComponentFixture<HomeFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFlashcardComponent]
    });
    fixture = TestBed.createComponent(HomeFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
