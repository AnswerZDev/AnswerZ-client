import { Component } from '@angular/core';

@Component({
  selector: 'app-play-flashcard',
  templateUrl: './play-flashcard.component.html',
  styleUrls: ['./play-flashcard.component.scss']
})
export class PlayFlashcardComponent {
  _indexFlashcard: number = 0;
  isFliped: boolean = false;
  direction: 'left' | 'right' = 'right';


  data: tmp_Flashcards[] = [
    { id: 29, question: "WW1", answer: "14/18" },
    { id: 30, question: "WW2", answer: "39/45" },
    { id: 31, question: "test3", answer: "test33" },
    { id: 32, question: "test5", answer: "test44" },
    { id: 32, question: "test5", answer: "test44" }
  ];


  progressValue = 1/this.data.length*100;
  
  
  increment() {
    if(this.isFliped){
      this.isFliped = !this.isFliped
    } 

    if (this.progressValue < 100) {
      this.progressValue += 1/this.data.length*100;
      this._indexFlashcard ++;
    }

    if(this._indexFlashcard > this.data.length){
      this._indexFlashcard = 0
    }

  }

  toLearn(){
    this.data.splice(this._indexFlashcard, 1);

    if(this._indexFlashcard >= this.data.length){
      this._indexFlashcard = 0
    }
  }

  flip_flashcard() {
    const flashcard = document.getElementById('flipContainer');

    if (flashcard) {
      flashcard.classList.remove('flipleft', 'flipright');

      void flashcard.offsetWidth;

      if (this.direction === 'right') {
        flashcard.classList.add('flipright');
      } else {
        flashcard.classList.add('flipleft');
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
