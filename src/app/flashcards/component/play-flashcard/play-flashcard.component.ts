import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsetService } from 'src/app/cardset/services/cardset.service';
import { Flashcard } from 'src/app/core/models/api/flashcard';


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
  nbGoodAnswers: number = 0;
  progressValue = 0;

  data: Flashcard[] = [];


  constructor(
      private readonly cardsetservice: CardsetService,
      private router: Router,
    ){

      // appeler API chargement données
      this.cardsetservice.cardsetPlay.flashcards?.forEach(
        flashcard => this.data.push(flashcard)
      );

    this.nbAnswers = this.data.length;
  }

  refreshProgressValue(){
    this.progressValue +=  Math.floor(1 / this.nbAnswers * 100);
    this.nbGoodAnswers += 1;

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
    if (this.isFliped) {
      this.isFliped = !this.isFliped;
    }

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

  get currrentFlashCard(): Flashcard | undefined {
    return this.data[this._indexFlashcard];
  }

  showDialog() {
      this.visible = true;
  }

  // leave the game 
  onClickLeave() {
    this.router.navigateByUrl('/cardset');
  }

  // restart the game
  onClickRestartGame() {
    this.cardsetservice.cardsetPlay.flashcards?.forEach(
      flashcard => this.data.push(flashcard)
    );

    this.progressValue = 0;
    this.visible = false;
    this.nbGoodAnswers = 0;
  }

}
