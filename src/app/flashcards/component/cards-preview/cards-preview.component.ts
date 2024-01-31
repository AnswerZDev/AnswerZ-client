import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { FormGroup } from '@angular/forms';
import { Flashcard } from 'src/app/core/models/api/flashcard';
import { FlashcardService } from '../../services/flashcards.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-cards-preview',
  templateUrl: './cards-preview.component.html',
  styleUrls: ['./cards-preview.component.scss'],
})
export class CardsPreviewComponent {
  @Input() flashcards: Flashcard[] = [];
  @Input() displayedFlashcards: any[] = [];
  @Input() flashcardForm!: FormGroup;
  @Input() question: string = '';
  @Input() answer: string = '';
  editMode: boolean = false;
  _currentDelete: number = 0;

  @Output() editModeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() flashcardId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private flashcardService: FlashcardService, 
    private router: Router, 
    private confirmService: ConfirmService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    // Vérifie si la route actuelle contient 'edit', si oui on est en mode édition, si non on est en mode création
    const currentRoute: string = this.router.url;
    this.editMode = currentRoute.includes('edit');
  }

  addFlashcard(newFlashcard: any) {
    this.flashcardService.onReceiveFlashcards.pipe(first()).subscribe({
      next: () => {
        this.toastService.toast('success', 'Success', 'You have created this element');
      },
      error: (error) => {
      }
    });
    this.flashcardService.createFlashcard(newFlashcard);
  }

  modifyFlashcard(id: number) {
    this.editModeClicked.emit();
    if(id !== undefined && id !== null) {
      this.flashcardId.emit(id);
    }
    this.flashcardService.getFlashcardById(id).subscribe((flashcard) => {
      if (flashcard) {
        const updatedFlashcard = this.flashcardForm.setValue({
            question: flashcard.question,
            answer: flashcard.answer
        });
        this.flashcardService.updateFlashcard(id, updatedFlashcard)
      }
    });
  }

  deleteFlashcard(id: number, event: Event) {
    this._currentDelete = id;
  
    this.confirmService.confirm(event, 'Are you sure you want to delete ?', 'Canceled suppression', () => 
    {
      if (this._currentDelete === undefined) {
        return;
      }

      this.flashcardService.onReceiveFlashcards.pipe(first()).subscribe({
        next: () => {
          // Suppression réussie
          this.flashcards = this.flashcards.filter((flashcard) => Number(flashcard.id) !== this._currentDelete);
          this.flashcardService.deleteFlashcard(this._currentDelete);
          this.toastService.toast('success', 'Success', 'You have deleted this element');
        },
        error: (error) => {
          // Erreur lors de la suppression
          console.error('Error during the suppression :', error);
        }
      });
      
    },
    () => {
      this._currentDelete = 0;
    });
    this.flashcardService.deleteFlashcard(id);
  }
}
