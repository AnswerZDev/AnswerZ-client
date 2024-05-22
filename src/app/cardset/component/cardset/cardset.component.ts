import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardsetService } from '../../services/cardset.service';

@Component({
  selector: 'app-cardset',
  templateUrl: './cardset.component.html',
  styleUrls: ['./cardset.component.scss'],
})
export class CardsetComponent {
  imageInformation: string = '../../../../assets/images/information.svg';
  imageWorld: string = '../../../../assets/images/world.svg';
  @Input() isLikedMode: boolean = false;
  @Input() displayedCardsets: any[] = [];

  direction: 'left' | 'right' = 'right';

  constructor(
    private readonly router: Router,
    public readonly cardsetsService: CardsetService
  ) {}

  redirectToEdit(cardsetId: number) {
    this.router.navigate([`/cardset/edit-flashcard-set/${cardsetId}`]);
  }

  flipCard(cardset: any) {
    const card = document.getElementById(`${cardset.id}`);

    if (card) {
      cardset.isFlipped = !cardset.isFlipped;

      card.classList.remove('flipleft', 'flipright');
      void card.offsetWidth;

      if (this.direction === 'right') {
        card.classList.add('flipright');
      } else {
        card.classList.add('flipleft');
      }

      this.direction = this.direction === 'right' ? 'left' : 'right';
    }
  }
}
