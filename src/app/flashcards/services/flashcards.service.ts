import { EventEmitter, Injectable } from '@angular/core';
import {Observable, map, Subject, tap} from 'rxjs';
import { FlashcardApi } from 'src/app/core/http/flashcard/flashcard.api';
import { Flashcard } from 'src/app/core/models/api/flashcard';

@Injectable({
    providedIn: 'root',
})
export class FlashcardService {

    private _flashcards: Flashcard[] = [];

    public onReceiveFlashcards: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onCreateFlashcards: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onUpdateFlashcards: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onDeleteFlashcards: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _flashCardsChange: Subject<boolean> = new Subject<boolean>()

    constructor(
        private readonly flascardApi: FlashcardApi
    ) {}

    get flashcards(): Flashcard[] {
        return this._flashcards;
    }

    get flashCardsChange(): Subject<boolean> {
        return this._flashCardsChange
    }

    public getAllFlashCards(): void {
        this.flascardApi.getAll().subscribe({
            next: (data: any) => {
                this._flashcards = data.member;    
                this.onReceiveFlashcards.emit(true);
                this.flashCardsChange.next(true);
            }, 
            error: (error) => {
      
            }
        });
    }

    public getFlashcardById(id: number): Observable<any> {
        return this.flascardApi.getOne(id).pipe(
            map((flashcard) => {
                return flashcard;       
            }),
        );
    }

    public getAllFlashcardByCardsetId(cardsetId: number): void {
        this.flascardApi.getAllFlashcardByCardsetId(cardsetId).subscribe({
            next: (data: any) => {
                this._flashcards = data.member;
                console.log(this._flashcards)   
                this.onReceiveFlashcards.emit(true);
                this.flashCardsChange.next(true);  
            },
            error: (error) => {
            }
        });
    }

    public createFlashcard(data: any): void {
        this.flascardApi.create(data).subscribe({
          next: (createdFlashcard: any) => {
            this._flashcards.push(createdFlashcard);
            this.onCreateFlashcards.emit(true);
            this.flashCardsChange.next(true);
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
                this.flashCardsChange.next(true);
                this.onUpdateFlashcards.emit(true);  
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
                }
                this.flashCardsChange.next(true);
                this.onDeleteFlashcards.emit(true);
            },
            error: (error) => {

            }
        });
    }
}
