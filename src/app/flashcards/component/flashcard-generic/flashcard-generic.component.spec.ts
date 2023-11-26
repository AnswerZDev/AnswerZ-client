import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardGenericComponent } from './flashcard-generic.component';

describe('FlashcardGenericComponent', () => {
  let component: FlashcardGenericComponent;
  let fixture: ComponentFixture<FlashcardGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashcardGenericComponent]
    });
    fixture = TestBed.createComponent(FlashcardGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
