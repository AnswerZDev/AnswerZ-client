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
  visible: boolean = false;
  nbAnswers: number = 0;
  progressValue = 0;

  data: tmp_Flashcards[] = [];


  constructor(){
    // appeler API chargement données
    this.data = [
      { id: 29, question: "WW1", answer: "14/18" },
      { id: 30, question: "WW2", answer: "39/45" },
      { id: 31, question: "test3", answer: "test33" }
    ];
  
    this.nbAnswers = this.data.length;
  }

  refreshProgressValue(){
    this.progressValue +=  Math.floor(1 / this.nbAnswers * 100);
    if(this.progressValue >= 99){
      this.progressValue = 100;
    }
  }



  isQuizFinished: boolean = false;

  good() {
    if (this.isFliped) {
      this.isFliped = !this.isFliped;
    }
    this.refreshProgressValue();

    this.data.splice(this._indexFlashcard, 1);

    this.isFinished();
  }


  toLearn() {
    this.data.push(this.data[this._indexFlashcard]);

    this.data.splice(this._indexFlashcard, 1);

    this.isFinished();    
  }


  isFinished() {
    if (this._indexFlashcard >= this.data.length) {
      this.isQuizFinished = true;
      this.showDialog();
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
    return this.data[this._indexFlashcard];
  }

  showDialog() {
      this.visible = true;
  }

}

/* Change to Flashcards models */
interface tmp_Flashcards {
  id: number;
  question: string;
  answer: string;
}
