import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../../services/flashcards.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modify-pop-up-preview',
  templateUrl: './modify-pop-up.component.html',
  styleUrls: ['./modify-pop-up.component.scss'],
})
export class ModifyPopUpComponent implements OnInit{

  flashcardId: number = 0;
  flashcardForm!: FormGroup

  constructor(
      public readonly flashcardService: FlashcardService,
      private readonly ref: DynamicDialogRef,
      private readonly config: DynamicDialogConfig,
      private readonly messageService: MessageService,
      private readonly formBuilder: FormBuilder,
  ) {
    this.updateForm();
  }


  ngOnInit(): void {
    this.flashcardService.getFlashcardById(this.config.data.id).subscribe({
      next: (data: any) => {
        this.flashcardForm.patchValue({
          id: data.id,
          question: data.question,
          answer: data.answer,
        });
        this.flashcardId = data.id;
      },
      error: (error) => {
      },
    });
  }
  private updateForm() {
    this.flashcardForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });
  }

  saveChanges(): void {
    if (this.flashcardForm.valid) {
      this.flashcardService.onUpdateFlashcards.pipe(first()).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', detail: 'Updated successfully' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', detail: 'Error during the update' });
        },
        complete: () => {
          this.flashcardForm.reset();
          this.ref.close();
        }
      });
      this.flashcardService.updateFlashcard(this.flashcardId, this.flashcardForm.value);
    }
  }
}
