import { EventEmitter, Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, Subject, map } from "rxjs";
import { CardsetApi } from "src/app/core/http/cardset/cardset.api";
import { Cardset } from "src/app/core/models/api/cardset";

export interface Mode {
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class CardsetService {

    private _cardsets: Cardset[] = [];

    cardsetForm!: FormGroup;

    public onReceiveCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onCreateCardsets: EventEmitter<any> = new EventEmitter<any>();
    public onUpdateCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _cardsetsChange: Subject<boolean> = new Subject<boolean>();

    public constructor(
        public readonly cardsetApi: CardsetApi,
    ) {
        this.cardsetForm = new FormGroup({
            image: new FormControl<string | null>(null),
            name: new FormControl<string | null>(null),
            description: new FormControl<string | null>(null),
            selectedCategory: new FormControl<Mode | null>(null),
            selectedVisibility: new FormControl<Mode | null>(null)
        });
    }

    get cardsets(): Cardset[] {
        return this._cardsets;
    }

    get cardsetsChange(): Subject<boolean> {
        return this._cardsetsChange
    }

    public getAllCardsets(): void {
        this.cardsetApi.getAll().subscribe({
            next: (data: any) => {
                this._cardsets = data.member;    
                this.onReceiveCardsets.emit(true);
                this.cardsetsChange.next(true);
            }, 
            error: (error) => {
      
            }
        });
    }

    public getCardsetById(id: number): Observable<any> {
        return this.cardsetApi.getOne(id).pipe(
            map((cardset) => {
                return cardset;       
            }),
        );
    }

    public createCardset(data: any): void {
        this.cardsetApi.create(data).subscribe({
          next: (createdCardset: any) => {
            this._cardsets.push(createdCardset);
            this.onCreateCardsets.emit(createdCardset.id);
            this.cardsetsChange.next(true);
          },
          error: (error) => {

          }
        });
    }

    public updateCardset(id: number, data: any): void {
        this.cardsetApi.update(id, data).subscribe({
          next: (updatedCardset: any) => {
            const index = this._cardsets.findIndex((cardset) => cardset.id === updatedCardset.id);
            this._cardsets[index] = updatedCardset;
            this.onUpdateCardsets.emit(true);
            this.cardsetsChange.next(true);
          },
          error: (error) => {

          }
        });
    }
}