import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardset',
  templateUrl: './cardset.component.html',
  styleUrls: ['./cardset.component.scss'],
})
export class CardsetComponent {
  imageInformation: string = '../../../../assets/images/information.svg';
  imageWorld: string = '../../../../assets/images/world.svg';
  imageEnglishTest: string = '../../../../assets/images/english_test.svg';
  imageHeart: string = '../../../../assets/images/heart.svg';
  @Input() isLikedMode: boolean = false;


  constructor(
    private readonly router: Router
  ) {}

  redirectToEdit() {
    this.router.navigate(['/cardset/edit-flashcard-set']);
  }

  flipCard(id: string) {
    const card = document.getElementById(id);
    if (card) {
      card.classList.remove('flipright');

      void card.offsetWidth;

      card.classList.add('flipright');
    }
  }
  
}
