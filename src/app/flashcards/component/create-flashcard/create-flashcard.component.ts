import { ChangeDetectorRef, Component } from '@angular/core';
import { FlashcardGenericComponent } from '../flashcard-generic/flashcard-generic.component';

@Component({
  selector: 'app-create-flashcard',
  templateUrl: './create-flashcard.component.html',
  styleUrls: ['./create-flashcard.component.scss'],
})
export class CreateFlashcardComponent extends FlashcardGenericComponent {

  override ngOnInit() {
    super.ngOnInit();
    this.isEditMode = false;
    this.title = 'Create your own set';
    console.log('title : ', this.title);
  }
}
