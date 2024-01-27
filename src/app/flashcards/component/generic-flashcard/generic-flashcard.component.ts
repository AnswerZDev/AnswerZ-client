import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { FlashcardsService } from '../../services/flashcards.service';
import { CardsPreviewComponent } from '../cards-preview/cards-preview.component';
import { ToastService } from 'src/app/shared/services/toast.service';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-generic-flashcard',
  templateUrl: './generic-flashcard.component.html',
  styleUrls: ['./generic-flashcard.component.scss']
})
export class GenericFlashcardComponent implements AfterContentInit{

  flashcardForm!: FormGroup;
  flashcards: any[] = [];
  displayedFlashcards: any[] = [];
  totalRecords: number = 0;
  first = 0;
  flashcardId: number = 0;

  modesVisibilite: Mode[] | undefined;
  modesCategorie: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined;
  selectedModeCategories: Mode | undefined;
  blockChars: RegExp = /^[0-9a-zA-Z\s]+$/;
  imageUpload: string = "../../../../assets/images/image_upload.png";

  @ViewChild(CardsPreviewComponent) cardsPreview!: CardsPreviewComponent;

  @ContentChildren(PrimeTemplate) templates = {} as QueryList<PrimeTemplate>;
  title: PrimeTemplate | undefined = undefined
  button: PrimeTemplate | undefined = undefined

  constructor(
    private formBuilder: FormBuilder, 
    private flashcardService: FlashcardsService, 
    private toastService: ToastService, 
    private el: ElementRef) {
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

    this.flashcardService.getAllFlashcards().subscribe((data: any) => {
      this.flashcards = data;
      this. totalRecords = this.flashcards.length;
      this.paginate({ first: 0, rows: 8, page: 1, pageCount: Math.ceil(this.totalRecords / 8) });
    });
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
      const imgLink = URL.createObjectURL(file);
      this.imageUpload = imgLink;
    } else {
      alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier de 25 Mo ou moins.");
    }
  }

  moveToPreview() {
    // Obtenez la position de la section de prévisualisation
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
        this.flashcardService.createFlashcard(this.flashcardForm.value).subscribe(
          (response) => {
            // Appelle la méthode dans CardsPreviewComponent pour ajouter la nouvelle flashcard
            this.cardsPreview.addFlashcard(response);
            this.toastService.toast('success', 'Success', 'Creation successed');
          },
          (error) => {
            console.error(error);
            this.toastService.toast('error', 'Error', 'Error during creation');
          },
          () => {
            // Réinitialise le formulaire dans le bloc finally
            this.flashcardForm.reset();
          }
        );
      } else {
        const data = {
          question: this.flashcardForm.value.question,
          answer: this.flashcardForm.value.answer
        };
        const idToUpdate = this.flashcardId;
        this.flashcardService.updateFlashcard(idToUpdate, data).subscribe(
          (response) => {
            // Appelle la méthode dans CardsPreviewComponent pour ajouter la nouvelle flashcard
            this.cardsPreview.modifyFlashcard(response.id);
            this.toastService.toast('success', 'Success', 'Modification successed');
            this.flashcardService.getAllFlashcards().subscribe((data: any) => {
              this.flashcards = data;
              this. totalRecords = this.flashcards.length;
            });
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
    this.displayedFlashcards = this.flashcards.slice(startIndex, endIndex);
  }
}
