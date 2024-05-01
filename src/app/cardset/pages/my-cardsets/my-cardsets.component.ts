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
  selectedModeVisibilities: Mode | undefined = { name: 'Private' };

  imageInformation: string = '../../../../assets/images/information.svg';
  value: number = 0;

  totalRecords: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 0;
  progressPercentage: number = 0;
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
      { name: 'Public' },
      { name: 'Private' }
    ];

    this.getAllCardsets('Private');
  }

  private onCardsetsSubscribe(): void {
    this.cardsetsService.cardsetsChange.subscribe({
      next: () => {
        this.totalRecords = this.cardsetsService.cardsets.length;
        this.paginate({ first: 0, rows: 4, page: 1, pageCount: Math.ceil(this.totalRecords / 4) });
      }
    });
  }

  private getAllCardsets(visibility: 'Private' | 'Public'): void {
    this.cardsetsService.onReceiveCardsets.pipe(first()).subscribe({
      next: () => {
        this.totalRecords = this.cardsetsService.cardsets.length;
        this.paginate({ first: 0, rows: 4, page: 1, pageCount: Math.ceil(this.totalRecords / 5) });
      },
      error: () => {
        this.toastService.toast('error', 'Error', 'Error during fetching cardsets');
      }
    });
    if(visibility === 'Public') {
      this.cardsetsService.getMyPublicCardsets();
    } else {
      this.cardsetsService.getMyPrivateCardsets();
    }
  }

  onVisibilityChange(event: any) {
    if(event.value['name'] === 'Public') {
      this.getAllCardsets('Public');
    } else {
      this.getAllCardsets('Private');
    }
  }

  redirectToCreateFlashcardSet() {
    this.router.navigate(['/cardset/create-flashcard-set']);
  }

  paginate(event: any) {
    this.currentPage = event.first / event.rows + 1; // Calcul de la page courante
    this.pageSize = event.rows; // Nombre d'éléments par page

    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.displayedCardsets = this.cardsetsService.cardsets.slice(startIndex, endIndex);

    this.totalRecords = this.cardsetsService.cardsets.length; // Total des enregistrements

    // Calcul du nombre total de pages
    if (this.totalRecords <= this.pageSize) {
        this.totalPages = 1; // Tout tient sur une seule page
    } else {
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    this.progressPercentage = (this.currentPage / this.totalPages) * 100;
  }
}
