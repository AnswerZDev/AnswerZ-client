import { Component } from '@angular/core';

@Component({
  selector: 'app-play-flashcard',
  templateUrl: './play-flashcard.component.html',
  styleUrls: ['./play-flashcard.component.scss']
})
export class PlayFlashcardComponent {
  progressValue = 25;

  increment() {
    if (this.progressValue < 100) {
      this.progressValue += 25;
    }
  }
}
