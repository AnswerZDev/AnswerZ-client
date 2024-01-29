import { Component } from '@angular/core';

@Component({
  selector: 'app-play-flashcard',
  templateUrl: './play-flashcard.component.html',
  styleUrls: ['./play-flashcard.component.scss']
})
export class PlayFlashcardComponent {
  progressValue = 25;
  _indexFlashcard: number = 0;
  isFliped: boolean = false;
  direction: 'left' | 'right' = 'right';


  data: tmp_Flashcards[] = [
    { id: 29, question: "test", answer: "test12" },
    { id: 30, question: "test2", answer: "test23" },
    { id: 31, question: "test3", answer: "test33" },
    { id: 32, question: "test4", answer: "test44" }
  ];
  
  
  increment() {
    if(this.isFliped){
      this.isFliped = !this.isFliped
    } 

    if(this.data.length > this._indexFlashcard+1)
    if (this.progressValue < 100) {
      this.progressValue += 25;
      this._indexFlashcard ++;

    }
  }


  flip_flashcard() {
    const flashcard = document.getElementById('flipContainer');

    if (flashcard) {
      flashcard.classList.remove('flipleft', 'flipright', 'animation-duration-1000');

      void flashcard.offsetWidth;

      if (this.direction === 'right') {
        flashcard.classList.add('flipright', 'animation-duration-1000');
      } else {
        flashcard.classList.add('flipleft', 'animation-duration-1000');
      }

      this.direction = this.direction === 'right' ? 'left' : 'right';

      this.isFliped = !this.isFliped;
    }
  }
      

  get currrentFlashCard(): tmp_Flashcards | undefined {
    return this.data[this._indexFlashcard]
  }
}

/* Change to FLashcards models */
interface tmp_Flashcards {
  id: number;
  question: string;
  answer: string;
}
