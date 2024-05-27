import {AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { CardsPreviewComponent } from '../../../flashcards/component/cards-preview/cards-preview.component';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { first } from 'rxjs';
import { CardsetService, Mode } from '../../services/cardset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generic-flashcard',
  templateUrl: './generic-flashcard-set.component.html',
  styleUrls: ['./generic-flashcard-set.component.scss']
})
export class GenericFlashcardSetComponent implements AfterContentInit, OnInit{

  flashcardForm!: FormGroup;
  displayedFlashcards: any[] = [];
  totalRecords: number = 0;
  first = 0;
  flashcardId: number = 0;

  cardsetId: number = 0;

  modesVisibilite: Mode[] | undefined;
  modesCategorie: Mode[] | undefined;
  categoryName: string = '';
  categoryVisibility: string = '';
  blockChars: RegExp = /^[0-9a-zA-Z\s]+$/;
  imageUpload: string = "../../../../assets/images/image_upload.svg";
  file: File | null =  null;
  imageUrl: string = ''; // Image qu'on a reçu dans le formulaire de modification
  resizedImageUrl: string = ''; // Image redimensionnée à afficher dans la section de prévisualisation

  @ViewChild(CardsPreviewComponent) cardsPreview!: CardsPreviewComponent;

  @ContentChildren(PrimeTemplate) templates = {} as QueryList<PrimeTemplate>;
  title: PrimeTemplate | undefined = undefined
  button: PrimeTemplate | undefined = undefined

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly flashcardsService: FlashcardService,
    public readonly cardsetsService: CardsetService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService
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
    //this.onCardsetsSubscribe();
    //this.onFlashcardesSubscribe();
    this.modesVisibilite = [
      { name: 'Public' },
      { name: 'Private' }
    ];
    this.modesCategorie = [
      { name: 'Mathematics' },
      { name: 'French' },
      { name: 'English' },
      { name: 'History' },
      { name: 'Geography' },
      { name: 'Science' },
      { name: 'Sport' },
      { name: 'Art' },
      { name: 'Music' },
      { name: 'Other' }
    ];

    this.cardsetId = this.route.snapshot.params['cardsetId'];

    this.getAllFlashcards();

    if(this.cardsetId !== null && this.cardsetId !== undefined) {
      this.getCardsetById();
    } else {
      this.cardsetsService.cardsetForm.reset();
    }
  }

  ngAfterContentInit(): void {
    this.title = this.templates.find((item) => (item.name === 'title'))
    this.button = this.templates.find((item) => (item.name === 'button'))
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.file = files[0];
      if(this.cardsetId === null || this.cardsetId === undefined){
        this.imageUpload = URL.createObjectURL(files[0]);
        this.handleFile(files[0]);
        this.resizeImage(this.imageUpload);
      } else {
        this.imageUrl = URL.createObjectURL(files[0])
        this.handleFile(files[0]);
        this.resizeImage(this.imageUrl);
      }
    }
  }

  private getAllFlashcards(): void {
    this.flashcardsService.onReceiveFlashcards.pipe(first()).subscribe(
      (data: any) => {
        if(data) {
          this.totalRecords = this.flashcardsService.flashcards.length;
          this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
        }
      } 
    )
    this.flashcardsService.getAllFlashCards();
  }

  private getCardsetById(): void {
    this.cardsetsService.getCardsetById(this.cardsetId).subscribe({
      next: (result) => {  
        this.cardsetsService.cardsetForm.patchValue({
            image: result.image,
            name: result.name,
            description: result.description,
            selectedCategory: this.modesCategorie?.find((item) => item.name === result.category),
            selectedVisibility: this.modesVisibilite?.find((item) => item.name === result.visibility)
        });
        this.imageUrl = result.image === null ? this.imageUpload : result.image;
        if(this.imageUrl !== this.imageUpload) {
          this.resizeImage(this.imageUrl);
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', detail: 'Error during fetching cardset' });
      }
    });
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.file = files[0];
      this.handleFile(files[0]);
      this.resizeImage(this.imageUrl)
    }
  }

  handleFile(file: File) {
    if (file.size > 25 * 1024 * 1024) {
      this.messageService.add({ severity: "warning", detail: "Le fichier dépasse la taille maximale autorisée (25 Mo)" });
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      this.imageUrl = event.target?.result as string;
      this.resizeImage(this.imageUrl);
    };
  
    reader.readAsDataURL(file);
  }
  
  resizeImage(imageDataUrl: string): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
  
    image.onload = () => {
      const width = 400;
      const height = 400;
  
      canvas.width = width;
      canvas.height = height;
  
      if (ctx) {
        ctx.drawImage(image, 0, 0, width, height);
        if(this.cardsetId === null || this.cardsetId === undefined){
          this.imageUpload = canvas.toDataURL("image/jpeg", 0.75);
        } else {
          this.imageUrl = canvas.toDataURL("image/jpeg", 0.75);
        }
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

  onSubmitCardset() {
    if (this.cardsetsService.cardsetForm.valid) {
      if(this.cardsetId === null || this.cardsetId === undefined){
        // Envoie les données au backend
        this.cardsetsService.onCreateCardsets.pipe(first()).subscribe({
          next: (id) => {
            const cardSetId = id;
            this.messageService.add({ severity: 'success', detail: 'Creation successed' });
            this.router.navigate(['/cardset/add-flashcard-to-set', cardSetId]);
          },
          error: () => {
            this.messageService.add({ severity: 'error', detail: 'Error during creation' });
          },
          complete: () => {
            // Réinitialise le formulaire dans le bloc finally (au cas où il n'y aurait pas de réponse)
            this.cardsetsService.cardsetForm.reset();
            this.imageUpload = '../../../../assets/images/image_upload.svg';
          }
        });
        const selectedCategoryControl = this.cardsetsService.cardsetForm.get('selectedCategory');
        const selectedVisibilityControl = this.cardsetsService.cardsetForm.get('selectedVisibility');

        if (selectedCategoryControl && selectedVisibilityControl) {
          const selectedCategory: Mode | null = selectedCategoryControl.value;
          const selectedVisibility: Mode | null = selectedVisibilityControl.value;

          if (selectedCategory) {
            this.categoryName = selectedCategory.name;
            selectedCategoryControl.setValue(this.categoryName);
          } else {
            this.messageService.add({ severity: 'error', detail: 'Some values are null' });
          }
        
          
          if (selectedVisibility) {
            this.categoryVisibility = selectedVisibility.name;
          } else {
            this.categoryVisibility = 'Public';
          }
        
          selectedVisibilityControl.setValue(this.categoryVisibility);
        } else {
          this.messageService.add({ severity: 'error', detail: 'Some values are null'});
        }

        const cardsetData = {
          name: this.cardsetsService.cardsetForm.value.name,
          description: this.cardsetsService.cardsetForm.value.description,
          category: this.categoryName,
          visibility: this.categoryVisibility,
          createdAt: new Date(),
          numberOfGoodAnswer: 0
        };

        if(this.file) {
          this.cardsetsService.createCardset(cardsetData, this.file); 
        } else {
          this.cardsetsService.createCardset(cardsetData); 
        }
      } else {
        this.cardsetsService.onUpdateCardsets.pipe(first()).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', detail: 'Modification successed' });
            this.router.navigate(['/cardset/add-flashcard-to-set', this.cardsetId]);
          },
          error: () => {
            this.messageService.add({ severity: 'error', detail: 'Error during update' });
          },
          complete: () => {
            // Réinitialise le formulaire dans le bloc finally (au cas où il n'y aurait pas de réponse)
            this.cardsetsService.cardsetForm.reset();
            this.imageUpload = '../../../../assets/images/image_upload.svg';
          }
        });
        const selectedCategoryControl = this.cardsetsService.cardsetForm.get('selectedCategory');
        const selectedVisibilityControl = this.cardsetsService.cardsetForm.get('selectedVisibility');

        if (selectedCategoryControl && selectedVisibilityControl) {
          const selectedCategory: Mode | null = selectedCategoryControl.value;
          const selectedVisibility: Mode | null = selectedVisibilityControl.value;

          if (selectedCategory) {
            this.categoryName = selectedCategory.name;
            selectedCategoryControl.setValue(this.categoryName);
          } else {
            this.messageService.add({ severity: 'error', detail: 'Some values are null' });
          }
        
          
          if (selectedVisibility) {
            this.categoryVisibility = selectedVisibility.name;
          } else {
            this.categoryVisibility = 'Public';
          }
        
          selectedVisibilityControl.setValue(this.categoryVisibility);
        } else {
          this.messageService.add({ severity: 'error', detail: 'Some values are null' });
        }
        const cardsetData = {
          name: this.cardsetsService.cardsetForm.value.name,
          description: this.cardsetsService.cardsetForm.value.description,
          category: this.categoryName,
          visibility: this.categoryVisibility,
          createdAt: new Date(),
        };
        if(this.file) {
          this.cardsetsService.updateCardset(this.cardsetId, cardsetData, this.file);
        } else {
          this.cardsetsService.updateCardset(this.cardsetId, cardsetData);
        }
      }
    } else {
      // Le formulaire n'est pas valide
      this.messageService.add({ severity: 'error', detail: 'Form is not valid' });
    }
  }

  paginate(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.displayedFlashcards = this.flashcardsService.flashcards.slice(startIndex, endIndex);
  }
}
