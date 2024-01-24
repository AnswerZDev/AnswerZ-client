import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FlashcardsService } from '../../services/flashcards.service';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GenericFlashcardComponent } from '../generic-flashcard/generic-flashcard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-preview',
  templateUrl: './cards-preview.component.html',
  styleUrls: ['./cards-preview.component.scss'],
})
export class CardsPreviewComponent {
  flashcards: any[] = [];
  editMode: boolean = false;

  @Output() editModeClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private flashcardService: FlashcardsService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.flashcardService.getAllFlashcards().subscribe((data: any) => {
      this.flashcards = data;
    });

    // Vérifier si la route actuelle contient 'edit', si oui on est en mode édition, si non on est en mode création
    const currentRoute: string = this.router.url;
    this.editMode = currentRoute.includes('edit');
  }

  addFlashcard(newFlashcard: any) {
    this.flashcards.push(newFlashcard);
  }

  modifyFlashcard(id: number) {
    console.log(id);
  }

  deleteFlashcard(id: number) {
    this.flashcardService.deleteFlashcard(id).subscribe(
      () => {
        // Suppression réussie
        this.flashcards = this.flashcards.filter((flashcard) => flashcard.id !== id);
        this.toastService.toast('success', 'Success', 'Suppression réussie');
      },
      (error) => {
        // Erreur lors de la suppression
        console.error('Erreur lors de la suppression :', error);
        this.toastService.toast('error', 'Error', 'Erreur lors de la suppression');
      }
    );
  }
}
