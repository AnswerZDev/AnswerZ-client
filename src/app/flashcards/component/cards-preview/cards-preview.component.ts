import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flashcard } from 'src/app/core/models/api/flashcard';
import { FlashcardService } from '../../services/flashcards.service';
import { first } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModifyPopUpComponent } from '../modify-pop-up/modify-pop-up.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cards-preview',
  templateUrl: './cards-preview.component.html',
  styleUrls: ['./cards-preview.component.scss'],
  providers: [DialogService]
})
export class CardsPreviewComponent {
  @Input() flashcards: Flashcard[] = [];
  @Input() displayedFlashcards: any[] = [];
  _currentDelete: number = 0;

  @Output() flashcardId: EventEmitter<number> = new EventEmitter<number>();

  private _ref: DynamicDialogRef | undefined;

  constructor(
    private readonly flashcardService: FlashcardService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService
  ) { }

  modifyFlashcard(id: number, question: string, answer: string) {
    if(id !== undefined && id !== null) {
      this._ref = this.dialogService.open(ModifyPopUpComponent, { 
        data: {
          id: id,
          question: question,
          answer: answer
        },
        header: 'Modify Flashcard',
      });
    }
  }

  deleteFlashcard(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this flashcard?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.flashcardService.onDeleteFlashcards.pipe(first()).subscribe({
          next: () => {
            this.flashcards = this.flashcards.filter((flashcard) => Number(flashcard.id) !== id);
            this.messageService.add({ severity: 'info', detail: 'Flashcard deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', detail: 'Error during deleting flashcard' });
          }
        });
        this.flashcardService.deleteFlashcard(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', detail: 'You have rejected' });
      }
    });
  };
}
