import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashcardToSetComponent } from './add-flahscard-to-cardset.component';

describe('GenericFlashcardSetComponent', () => {
  let component: AddFlashcardToSetComponent;
  let fixture: ComponentFixture<AddFlashcardToSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlashcardToSetComponent]
    });
    fixture = TestBed.createComponent(AddFlashcardToSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
