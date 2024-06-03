import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlashcardsSetComponent } from './all-flashcards-set.component';

describe('AllFlashcardsSetComponent', () => {
  let component: AllFlashcardsSetComponent;
  let fixture: ComponentFixture<AllFlashcardsSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFlashcardsSetComponent]
    });
    fixture = TestBed.createComponent(AllFlashcardsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
