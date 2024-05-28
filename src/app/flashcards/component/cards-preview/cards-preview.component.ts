import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { Flashcard } from 'src/app/core/models/api/flashcard';
import { FlashcardService } from '../../services/flashcards.service';
import { first } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModifyPopUpComponent } from '../modify-pop-up/modify-pop-up.component';

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
    private readonly confirmService: ConfirmService,
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

  // deleteFlashcard(id: number, event: Event) {
  //   this.confirmService.confirm(event, 'Are you sure you want to delete ?', 'Delete successfully', 'Canceled suppression', () => 
  //   {
  //     this.flashcardService.onDeleteFlashcards.pipe(first()).subscribe({
  //       next: () => {
  //         // Suppression réussie
  //         this.flashcards = this.flashcards.filter((flashcard) => Number(flashcard.id) !== id);
  //       },
  //       error: () => {
          
  //       }
  //     });
  //     this.flashcardService.deleteFlashcard(id);
  //   }, 
  //   () => {
      
  //   });
  // };
}
