import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsSetComponent } from './flashcards-set.component';

describe('FlashcardsSetComponent', () => {
  let component: FlashcardsSetComponent;
  let fixture: ComponentFixture<FlashcardsSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashcardsSetComponent]
    });
    fixture = TestBed.createComponent(FlashcardsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
