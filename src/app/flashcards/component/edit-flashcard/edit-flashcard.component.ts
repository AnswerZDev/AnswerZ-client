import { Component } from '@angular/core';
import { FlashcardGenericComponent } from '../flashcard-generic/flashcard-generic.component';

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.scss']
})
export class EditFlashcardComponent extends FlashcardGenericComponent {

  constructor() {
    super();
    this.isEditMode = true;
    this.title = 'Edit your flashcard set';
  }
}
