import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { CardsPreviewComponent } from '../../../flashcards/component/cards-preview/cards-preview.component';
import { FlashcardApi } from 'src/app/core/http/flashcard/flashcard.api';
import { FlashcardService } from 'src/app/flashcards/services/flashcards.service';
import { first } from 'rxjs';
import { Flashcard } from 'src/app/core/models/api/flashcard';
import { Toast } from 'primeng/toast';
import { ToastService } from 'src/app/shared/services/toast.service';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-generic-flashcard',
  templateUrl: './generic-flashcard-set.component.html',
  styleUrls: ['./generic-flashcard-set.component.scss']
})
export class GenericFlashcardSetComponent implements AfterContentInit{

  flashcardForm!: FormGroup;
  displayedFlashcards: any[] = [];
  totalRecords: number = 0;
  first = 0;
  flashcardId: number = 0;

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
    private readonly el: ElementRef,
    public readonly flashcardsService: FlashcardService
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

    this.getAllFlashcards();
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

  getFlashcardId(id: number) {
    this.flashcardId = id;
  }

  onSubmit() {
    if (this.flashcardForm.valid) {
      // Envoie les données au backend
      if(this.flashcardId === undefined || this.flashcardId === 0){
        this.flashcardsService.onReceiveFlashcards.pipe(first()).subscribe({
          next: (response) => {
            // Appelle la méthode dans CardsPreviewComponent pour ajouter la nouvelle flashcard
            this.cardsPreview.addFlashcard(response);
            this.toastService.toast('success', 'Success', 'Creation successed');
          },
          error: (error) => {
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
          const idToUpdate = this.flashcardId;
          this.flashcardsService.onReceiveFlashcards.pipe(first()).subscribe(
            (response) => {
              // Appelle la méthode dans CardsPreviewComponent pour ajouter la nouvelle flashcard
              this.cardsPreview.modifyFlashcard(idToUpdate);
              this.toastService.toast('success', 'Success', 'Modification successed');
              this. totalRecords = this.flashcardsService.flashcards.length;
            },
            (error) => {
              console.error(error);
              this.toastService.toast('error', 'Error', 'Error during creation');
            },
            () => {
              setTimeout(() => {
                this.flashcardForm.patchValue({
                  question: '',
                  answer: ''
                });
                this.flashcardId = 0;
              }, 100);
            }
          );
          this.flashcardsService.updateFlashcard(idToUpdate, data);
        }
      } else {
        // Le formulaire n'est pas valide
        console.error('Form is not valid');
        this.toastService.toast('error', 'Error', 'Form is not valid');
      }
  }

  moveToInput() {
    const formContainer = this.el.nativeElement.querySelector('.flashcardForm');

    if (formContainer) {
      // Déclencher le focus sur le premier champ de saisie
      const firstInput = formContainer.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  } 

  paginate(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.displayedFlashcards = this.flashcardsService.flashcards.slice(startIndex, endIndex);
  }
}
