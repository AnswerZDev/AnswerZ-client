import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardsetService } from '../../services/cardset.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cardset',
  templateUrl: './cardset.component.html',
  styleUrls: ['./cardset.component.scss'],
})
export class CardsetComponent {
  imageInformation: string = '../../../../assets/images/information.svg';
  imageWorld: string = '../../../../assets/images/world.svg';
  @Input() displayedCardsets: any[] = [];

  direction: 'left' | 'right' = 'right';

  constructor(
    private readonly router: Router,
    public readonly cardsetsService: CardsetService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
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

  deleteCardset(event: Event, cardsetId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this cardset?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.cardsetsService.deleteCardset(cardsetId);
        this.messageService.add({ severity: 'info', detail: 'Cardset deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', detail: 'You have rejected' });
      }
    });
  }
}
