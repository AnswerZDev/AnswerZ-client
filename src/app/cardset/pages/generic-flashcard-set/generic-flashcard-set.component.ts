import {AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { CardsPreviewComponent } from '../../../flashcards/component/cards-preview/cards-preview.component';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { first } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
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

  cardsetId: number | null = 0;

  modesVisibilite: Mode[] | undefined;
  modesCategorie: Mode[] | undefined;
  categoryName: string = '';
  categoryVisibility: string = '';
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
    public readonly cardsetsService: CardsetService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
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
    this.onCardsetsSubscribe();
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
  }

  ngAfterContentInit(): void {
    this.title = this.templates.find((item) => (item.name === 'title'))
    this.button = this.templates.find((item) => (item.name === 'button'))
  }

  // private onFlashcardesSubscribe(): void {
  //   this.flashcardsService.flashCardsChange.subscribe({
  //     next: () => {
  //       this.totalRecords = this.flashcardsService.flashcards.length;
  //       this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
  //     }
  //   });
  // }

  private onCardsetsSubscribe(): void {
    this.cardsetsService.cardsetsChange.subscribe({
      next: () => {
        console.log("cardsetsChange")
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

  onSubmitFlashcard() {
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
        this.flashcardsService.createFlashcard(this.flashcardForm.value);
      } else {
          const data = {
            question: this.flashcardForm.value.question,
            answer: this.flashcardForm.value.answer
          };
          this.flashcardsService.onUpdateFlashcards.pipe(first()).subscribe({
            next: () => {
              //this.toastService.toast('success', 'Success', 'Modification successed');
            },
            error: () => {
              //this.toastService.toast('error', 'Error', 'Error during update');
            },
            complete: () => {
              // Réinitialise le formulaire dans le bloc finally (au cas où il n'y aurait pas de réponse)
              //this.flashcardsService.flashcardForm.reset();
            }
          });
          //this.flashcardsService.updateFlashcard(this.flashcardId, data);
        }
      } else {
        // Le formulaire n'est pas valide
        this.toastService.toast('error', 'Error', 'Form is not valid');
      }
  }

  onSubmitCardset() {
    if (this.cardsetsService.cardsetForm.valid) {
      if(this.cardsetId === null || this.cardsetId === undefined){
        // Envoie les données au backend
        this.cardsetsService.onCreateCardsets.pipe(first()).subscribe({
          next: (id) => {
            const cardSetId = id;
            this.toastService.toast('success', 'Success', 'Creation successed');
            this.router.navigate(['/cardset/add-flashcard-to-set', cardSetId]);
          },
          error: () => {
            this.toastService.toast('error', 'Error', 'Error during creation');
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
            this.toastService.toast('error', 'Error', 'Some values are null');
          }
        
          
          if (selectedVisibility) {
            this.categoryVisibility = selectedVisibility.name;
          } else {
            this.categoryVisibility = 'Public';
          }
        
          selectedVisibilityControl.setValue(this.categoryVisibility);
        } else {
          this.toastService.toast('error', 'Error', 'Some values are null');
        }
        const cardsetData = {
          name: this.cardsetsService.cardsetForm.value.name,
          description: this.cardsetsService.cardsetForm.value.description,
          category: this.categoryName,
          visibility: this.categoryVisibility,
          image: this.imageUpload,
          createdAt: new Date(),
          numberOfGoodAnswer: 0,
          flashcards: this.displayedFlashcards,
        };
        this.cardsetsService.createCardset(cardsetData);
      } else {
        this.cardsetsService.onUpdateCardsets.pipe(first()).subscribe({
          next: () => {
            this.toastService.toast('success', 'Success', 'Modification successed');
            this.router.navigate(['/cardset/add-flashcard-to-set', this.cardsetId]);
          },
          error: () => {
            this.toastService.toast('error', 'Error', 'Error during update');
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
            this.toastService.toast('error', 'Error', 'Some values are null');
          }
        
          
          if (selectedVisibility) {
            this.categoryVisibility = selectedVisibility.name;
          } else {
            this.categoryVisibility = 'Public';
          }
        
          selectedVisibilityControl.setValue(this.categoryVisibility);
        } else {
          this.toastService.toast('error', 'Error', 'Some values are null');
        }
        const cardsetData = {
          name: this.cardsetsService.cardsetForm.value.name,
          description: this.cardsetsService.cardsetForm.value.description,
          category: this.categoryName,
          visibility: this.categoryVisibility,
          image: this.imageUpload,
          createdAt: new Date(),
        };
        this.cardsetsService.updateCardset(this.cardsetId, cardsetData);
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
