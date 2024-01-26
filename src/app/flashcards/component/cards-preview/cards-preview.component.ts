import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlashcardsService } from '../../services/flashcards.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cards-preview',
  templateUrl: './cards-preview.component.html',
  styleUrls: ['./cards-preview.component.scss'],
})
export class CardsPreviewComponent {
  @Input() flashcards: any[] = [];
  @Input() displayedFlashcards: any[] = [];
  @Input() flashcardForm!: FormGroup;
  @Input() question: string = '';
  @Input() answer: string = '';
  editMode: boolean = false;
  _currentDelete: number = 0;

  @Output() editModeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() flashcardId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private flashcardService: FlashcardsService, 
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
    this.flashcards.push(newFlashcard);
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
          .subscribe((result) => {
            console.log('Flashcard updated with success', result);
          });
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

      this.flashcardService.deleteFlashcard(this._currentDelete).subscribe(
        () => {
          // Suppression réussie
          this.flashcards = this.flashcards.filter((flashcard) => flashcard.id !== this._currentDelete);
          this.toastService.toast('success', 'Success', 'You have deleted this element');
        },
        (error) => {
          // Erreur lors de la suppression
          console.error('Error during the suppression :', error);
        }
      );
    },
    () => {
      console.log('Rejected in Component 1');
    });
  }
}
