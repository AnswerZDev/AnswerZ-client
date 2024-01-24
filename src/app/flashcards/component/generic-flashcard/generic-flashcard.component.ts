import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private flashcardService: FlashcardsService, private toastService: ToastService, private el: ElementRef, private renderer: Renderer2) {
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
    const totalHeight = document.documentElement.scrollHeight;
    // Déplace la fenêtre vers le haut de la section de prévisualisation
    window.scrollTo({
      top: totalHeight,
      behavior: 'smooth'
    });
  }

  onSubmit() {
    if (this.flashcardForm.valid) {
      // Envoye les données au backend
      this.flashcardService.createFlashcard(this.flashcardForm.value).subscribe(
        (response) => {
          console.log(response);
          // Appelle la méthode dans CardsPreviewComponent pour ajouter la nouvelle flashcard
          this.cardsPreview.addFlashcard(response);
          this.flashcardForm.reset();
          this.toastService.toast('success', 'Success', 'Création réussie');
        },
        (error) => {
          console.error(error);
          this.toastService.toast('error', 'Error', 'Erreur lors de la création');
        }
      );
    } else {
      // Le formulaire n'est pas valide
      console.error('Form is not valid');
      this.toastService.toast('error', 'Error', 'Le formulaire n\'est pas valide');
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
}
