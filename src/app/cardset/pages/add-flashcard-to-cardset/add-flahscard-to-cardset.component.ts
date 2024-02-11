import {AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { CardsPreviewComponent } from '../../../flashcards/component/cards-preview/cards-preview.component';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { first } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CardsetService } from '../../services/cardset.service';
import { ActivatedRoute } from '@angular/router';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-add-flashcard-to-set',
  templateUrl: './add-flahscard-to-cardset.component.html',
  styleUrls: ['./add-flahscard-to-cardset.component.scss']
})
export class AddFlashcardToSetComponent implements AfterContentInit, OnInit{

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

  @ViewChild(CardsPreviewComponent) cardsPreview!: CardsPreviewComponent;

  @ContentChildren(PrimeTemplate) templates = {} as QueryList<PrimeTemplate>;
  title: PrimeTemplate | undefined = undefined
  button: PrimeTemplate | undefined = undefined

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService, 
    public readonly flashcardsService: FlashcardService,
    public readonly  cardsetsService: CardsetService,
    private readonly route: ActivatedRoute,
  ) {
    this.createForm();
  }

  private createForm() {
    this.flashcardForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
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

  ngAfterContentInit(): void {
    this.title = this.templates.find((item) => (item.name === 'title'))
    this.button = this.templates.find((item) => (item.name === 'button'))
  }

  getCardsetById() {
    this.cardsetsService.getCardsetById(this.cardsetId).subscribe({
      next: (result) => {
        // Stocke les informations du cardset dans la propriété cardset
        this.cardset = result;

        // Vous pouvez maintenant accéder à l'image du cardset, par exemple :
        this.imageResized = this.cardset.image;
        this.cardsetName = this.cardset.name;
        this.cardsetDescription = this.cardset.description;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du cardset : ', error);
      }
    });
  }

  private onFlashcardesSubscribe(): void {
    this.flashcardsService.flashCardsChange.subscribe({
      next: () => {
        this.totalRecords = this.flashcardsService.flashcards.length;
        this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
      }
    });
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.handleImageFile(file);
    }
  }

  private getAllFlashcardByCardsetId(): void {
    this.flashcardsService.onReceiveFlashcards.pipe(first()).subscribe({
      next: () => {
        this.totalRecords = this.flashcardsService.flashcards.length;
        this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
      },
      error: (error) => {
        this.toastService.toast('error', 'Error', 'Error during fetching flashcards');
      }
    });
    this.flashcardsService.getAllFlashcardByCardsetId(this.cardsetId);
  }

  uploadImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.handleImageFile(file);
    }
  }

  handleImageFile(file: File) {
    const maxSizeInBytes = 25 * 1024 * 1024; // 25 Mo en octets
  
    if (file.size <= maxSizeInBytes) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const imageDataUrl = e.target.result;
        this.resizeImage(imageDataUrl);
      };
  
      reader.readAsDataURL(file);
    } else {
      alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier de 25 Mo ou moins.");
    }
  }
  
  resizeImage(imageDataUrl: string): void {
    const img = new Image();
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      if (ctx) {  // Vérification pour éviter l'erreur potentielle
        // Définissez la taille souhaitée (par exemple, 300x300)
        const targetWidth = 300;
        const targetHeight = 300;
  
        canvas.width = targetWidth;
        canvas.height = targetHeight;
  
        // Dessinez l'image redimensionnée sur le canvas
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
        // Obtenez l'URL de l'image redimensionnée
        const resizedImage = canvas.toDataURL('image/jpeg');
  
        // Utilisez `resizedImage` comme source pour votre image dans le modèle
        this.imageUpload = resizedImage;
      } else {
        console.error("Le contexte 2D du canvas est null.");
      }
    };
  
    img.src = imageDataUrl;
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
      if(this.flashcardId === undefined || this.flashcardId === 0){
        this.flashcardsService.onCreateFlashcards.pipe(first()).subscribe({
          next: () => {
            this.toastService.toast('success', 'Success', 'Creation successed');
            this.totalRecords = this.flashcardsService.flashcards.length;
          },
          error: () => {
            this.toastService.toast('error', 'Error', 'Error during creation');
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
              this.toastService.toast('success', 'Success', 'Modification successed');
            },
            error: () => {
              this.toastService.toast('error', 'Error', 'Error during update');
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
        this.toastService.toast('error', 'Error', 'Form is not valid');
      }
  }

  paginate(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.displayedFlashcards = this.flashcardsService.flashcards.slice(startIndex, endIndex);
  }
}
