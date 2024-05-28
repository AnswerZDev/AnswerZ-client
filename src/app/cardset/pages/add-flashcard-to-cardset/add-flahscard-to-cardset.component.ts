import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { first } from 'rxjs';
import { CardsetService } from '../../services/cardset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-add-flashcard-to-set',
  templateUrl: './add-flahscard-to-cardset.component.html',
  styleUrls: ['./add-flahscard-to-cardset.component.scss']
})
export class AddFlashcardToSetComponent implements OnInit{

  flashcardForm!: FormGroup;
  displayedFlashcards: any[] = [];
  totalRecords: number = 0;
  first = 0;
  flashcardId: number = 0;

  cardsetId: number = 0;
  cardset: any;
  cardsetName: string = '';
  cardsetDescription: string = '';

  modesVisibilite: Mode[] | undefined;
  modesCategorie: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined;
  selectedModeCategories: Mode | undefined;
  blockChars: RegExp = /^[0-9a-zA-Z\s]+$/;
  imageUpload: string = "../../../../assets/images/image_upload.svg";
  imageResized: string = ''; // Image redimensionnée à afficher dans la section de prévisualisation

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService, 
    public readonly flashcardsService: FlashcardService,
    public readonly  cardsetsService: CardsetService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.createForm();
  }

  private createForm() {
    this.flashcardForm = this.formBuilder.group({
      question: [''],
      answer: [''],
    });
  }
  
  ngOnInit() {
    this.onFlashcardesSubscribe();
    this.modesVisibilite = [
      { name: 'Public' },
      { name: 'Private' },
    ];
    this.modesCategorie = [
      { name: 'English' },
      { name: 'Sport' },
      { name: 'Mathematics' },
      { name: 'Chemical Physics'}
    ];

    this.cardsetId = this.route.snapshot.params['cardsetId'];  // On récupère l'id du cardset qu'on vient de créer ou qu'on a créé

    
    this.getCardsetById(); // On récupère les informations du cardset
    this.getAllFlashcardByCardsetId();
  }

  getCardsetById() {
    this.cardsetsService.getCardsetById(this.cardsetId).subscribe({
      next: (result) => {
        // Stocke les informations du cardset dans la propriété cardset
        this.cardset = result;

        if(this.cardset.image !== null) {
          this.imageResized = this.cardset.image;
        } else {
          this.imageResized = '../../../../assets/images/no_image.jpg';
        }
        this.cardsetName = this.cardset.name;
        this.cardsetDescription = this.cardset.description;

        this.resizeImage(this.imageResized);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', detail: 'Erreur lors de la récupération du cardset' });
      }
    });
  }

  private onFlashcardesSubscribe(): void {
    this.flashcardsService._flashCardsChange.subscribe({
      next: () => {
        this.totalRecords = this.flashcardsService._flashcards.length;
        this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
      }
    });
  }

  private getAllFlashcardByCardsetId(): void {
    this.flashcardsService.onReceiveFlashcards.pipe(first()).subscribe({
      next: () => {
        this.totalRecords = this.flashcardsService._flashcards.length;
        this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', detail: 'Error during fetching flashcards' });
      }
    });
    this.flashcardsService.getAllFlashcardByCardsetId(this.cardsetId);
  }
  
  resizeImage(imageDataUrl: string): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
  
    image.onload = () => {
      const width = 500;
      const height = 300;
  
      canvas.width = width;
      canvas.height = height;
  
      if (ctx) {
        ctx.drawImage(image, 0, 0, width, height);
        this.imageResized = canvas.toDataURL('image/jpeg', 1);
      }
    };

    image.src = imageDataUrl;
    image.setAttribute('crossOrigin', 'anonymous');
  }

  moveToPreview() {
    // Obtiens la position de la section de prévisualisation
    const previewSection = document.getElementById('previewSection');
    if (previewSection) {
      const previewSectionPosition = previewSection.getBoundingClientRect().top;
  
      // Déplace la fenêtre vers la position de la première flashcard
      window.scrollTo({
        top: window.scrollY + previewSectionPosition,
        behavior: 'smooth'
      });
    }
  }

  onSubmit() {
    if (this.flashcardForm.valid) {
      // Envoie les données au backend
      if(this.flashcardId === undefined || this.flashcardId === 0) {
        this.flashcardsService.onCreateFlashcards.pipe(first()).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', detail: 'Creation successed' });
            this.totalRecords = this.flashcardsService._flashcards.length;
          },
          error: () => {
            this.messageService.add({ severity: 'error', detail: 'Error during creation' });
          },
          complete: () => {
            // Réinitialise le formulaire dans le bloc finally (au cas où il n'y aurait pas de réponse)
            this.flashcardForm.reset();
          }
        });
        const flashcardData = {
          question: this.flashcardForm.value.question,
          answer: this.flashcardForm.value.answer,
          cardset: this.cardsetId,
        }
        this.flashcardsService.createFlashcard(flashcardData);
      } else {
          const data = {
            question: this.flashcardForm.value.question,
            answer: this.flashcardForm.value.answer
          };
          this.flashcardsService.onUpdateFlashcards.pipe(first()).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', detail: 'Modification successed' });
            },
            error: () => {
              this.messageService.add({ severity: 'error', detail: 'Error during update' });
            },
            complete: () => {
              // Réinitialise le formulaire dans le bloc finally (au cas où il n'y aurait pas de réponse)
              this.flashcardForm.reset();
            }
          });
          this.flashcardsService.updateFlashcard(this.flashcardId, data);
      }
    } else {
      // Le formulaire n'est pas valide
      this.messageService.add({ severity: 'error', detail: 'Form is not valid' });
    }
  }

  onSubmitFlashcardsToCardset() {
    const cardset = {
      ...this.cardset,
      _flashcards: this.flashcardsService._flashcards
    }
    this.cardset = cardset;
    if(cardset) {
      this.cardsetsService.cardsets.push(cardset);
      this.messageService.add({ severity: 'success', detail: 'Modification successed' });
      this.router.navigate(['/cardset/my-cardsets']);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Error during submit flashcards to cardset' });
    }
  }

  paginate(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.displayedFlashcards = this.flashcardsService._flashcards.slice(startIndex, endIndex);
  }
}
