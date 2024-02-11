import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsetService, Mode } from '../../services/cardset.service';
import { first } from 'rxjs';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-my-cardsets',
  templateUrl: './my-cardsets.component.html',
  styleUrls: ['./my-cardsets.component.scss']
})
export class MyCardsetsComponent implements OnInit {
  modesVisibilite: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined = {name: 'Private'};

  imageInformation: string = '../../../../assets/images/information.svg';
  value: number = 0;

  totalRecords: number = 0;
  currentPage: number = 0;
  pageSize: number = 0;
  displayedCardsets: any[] = [];

  isLikedMode: boolean = true;

  constructor(
    private router: Router,
    public readonly cardsetsService: CardsetService,
    public readonly flashcardsService: FlashcardService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.onCardsetsSubscribe();
    this.modesVisibilite = [
      {name: 'Public'},
      {name: 'Private'}
    ];

    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
      }
    }, 2000);

    this.getAllCardsets();
  }

  private onCardsetsSubscribe(): void {
    this.cardsetsService.cardsetsChange.subscribe({
      next: () => {
        this.totalRecords = this.cardsetsService.cardsets.length;
        this.paginate({ first: 0, rows: 4, page: 1, pageCount: Math.ceil(this.totalRecords / 4) });
      }
    });
  }

  private getAllCardsets(): void {
    this.cardsetsService.onReceiveCardsets.pipe(first()).subscribe({
      next: () => {
        this.totalRecords = this.cardsetsService.cardsets.length;
        this.paginate({ first: 0, rows: 4, page: 1, pageCount: Math.ceil(this.totalRecords / 5) });
      },
      error: (error) => {
        this.toastService.toast('error', 'Error', 'Error during fetching cardsets');
      }
    });
    this.cardsetsService.getAllCardsets();
  }

  redirectToCreateFlashcardSet() {
    this.router.navigate(['/cardset/create-flashcard-set']);
  }

  paginate(event: any) {
    this.currentPage = event.first / event.rows + 1; // Calcul de la page courante
    this.pageSize = event.rows; // Nombre d'éléments par page
  
    // Filtrer les cardsets avec une visibilité en privé
    const privateCardsets = this.cardsetsService.cardsets
      .filter(cardset => cardset.visibility === 'Private');
  
    const totalPages = Math.ceil(privateCardsets.length / this.pageSize); // Calcul du nombre total de pages

    this.pageSize = totalPages;
  
    this.displayedCardsets = privateCardsets
      .slice(event.first, event.first + this.pageSize);
  }
}
