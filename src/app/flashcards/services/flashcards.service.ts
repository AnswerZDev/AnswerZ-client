import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FlashcardApi } from 'src/app/core/http/flashcard/flashcard.api';
import { Flashcard } from 'src/app/core/models/api/flashcard';

@Injectable({
    providedIn: 'root',
})
export class FlashcardService {

    private _flashcards: Flashcard[] = [];

    public onReceiveFlashcards: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private readonly flascardApi: FlashcardApi,  
    ) { }

    public getAllFlashCards(): void {
        this.flascardApi.getAll().subscribe({
            next: (data: any) => {
                this._flashcards = data.member;    
                this.onReceiveFlashcards.emit(true)        
            }, 
            error: (error) => {
      
            }
        });
    }

    get flashcards(): Flashcard[] {
        return this._flashcards;
    }

    public getFlashcardById(id: number): Observable<any> {
        return this.flascardApi.getOne(id).pipe(
            map((flashcard) => {
                return flashcard;       
            }), 
        );
    }

    public createFlashcard(data: any): void {
        this.flascardApi.create(data).subscribe({
          next: (createdFlashcard: any) => {
            this._flashcards.push(createdFlashcard);
            this.onReceiveFlashcards.emit(true);
          },
          error: (error) => {

          }
        });
    }

    public updateFlashcard(id: number, data: any): void {
        this.flascardApi.update(id, data).subscribe({
            next: (data: any) => {
                const index = this._flashcards.findIndex((flashcard) => Number(flashcard.id) === id);
                if (index !== -1) {
                    this._flashcards[index] = data;
                }
                this.onReceiveFlashcards.emit(true);  
            }, 
            error: (error) => {

            }
        });
    }

    public deleteFlashcard(id: number): void {
        this.flascardApi.deleteByid(id).subscribe({
            next : () => {
                const index = this._flashcards.findIndex((flashcard) => Number(flashcard.id) === id);
                if (index !== -1) {
                    this._flashcards.splice(index, 1);
                    this.onReceiveFlashcards.emit(true);
                }
            },
            error: (error) => {

            }
        });
    }
}
