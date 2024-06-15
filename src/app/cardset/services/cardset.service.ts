import { EventEmitter, Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, Subject, map } from "rxjs";
import { CardsetApi } from "src/app/core/http/cardset/cardset.api";
import { Cardset } from "src/app/core/models/api/cardset";

export interface Mode {
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class CardsetService {
  private _cardsets: Cardset[] = [];
  private cardset_play!: Cardset;

  cardsetForm!: FormGroup;

  public onReceiveCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
  public onCreateCardsets: EventEmitter<any> = new EventEmitter<any>();
  public onUpdateCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
  public onDeleteCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _cardsetsChange: Subject<boolean> = new Subject<boolean>();

  private _pictureUpdated: Subject<boolean> = new Subject<boolean>();

  public constructor(public readonly cardsetApi: CardsetApi) {
    this.cardsetForm = new FormGroup({
      image: new FormControl<File | null>(null),
      name: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      selectedCategory: new FormControl<Mode | null>(null),
      selectedVisibility: new FormControl<Mode | null>(null),
    });
  }

  get cardsets(): Cardset[] {
    return this._cardsets;
  }

  get cardsetsChange(): Subject<boolean> {
    return this._cardsetsChange;
  }

  get cardsetPlay(){
    return this.cardset_play;
 }

  setcardsetPlay(cardset: Cardset){
    this.cardset_play = cardset;
  }

  public getMyPrivateCardsets(): void {
    this.cardsetApi.getMyCardsets("Private").subscribe({
      next: (data: any) => {
        this._cardsets = data.member;
        this.onReceiveCardsets.emit(true);
        this.cardsetsChange.next(true);
      },
      error: (error) => {},
    });
  }

  public getMyPublicCardsets(): void {
    this.cardsetApi.getMyCardsets("Public").subscribe({
      next: (data: any) => {
        this._cardsets = data.member;
        this.onReceiveCardsets.emit(true);
        this.cardsetsChange.next(true);
      },
      error: (error) => {},
    });
  }

  public getCardsetById(id: number): Observable<any> {
    return this.cardsetApi.getOne(id).pipe(
      map((cardset) => {
        return cardset;
      })
    );
  }

  getAllCardsetPublic(): void{
    this.cardsetApi.getAllCardsetPublic().subscribe({
        next: (data: any) => {
            this._cardsets = data.member;
        },
        error: () => {
        }
    });
  }

  public createCardset(data: any, file?: File): void {
    this.cardsetApi.create(data).subscribe({
      next: (createdCardset: any) => {
        if (file !== null) {
          this.uploadCardsetImage(createdCardset.id, file);
        }
        this._cardsets.push(createdCardset);
        this.onCreateCardsets.emit(createdCardset.id);
        this.cardsetsChange.next(true);
      },
      error: (error) => {},
    });
  }

  public updateCardset(id: number, data: any, file?: File): void {
    this.cardsetApi.update(id, data).subscribe({
      next: (updatedCardset: any) => {
        if (file !== null) {
          this._pictureUpdated.subscribe({
            next: (value) => {
              if (value) {
                this.onUpdateCardsets.emit(true);
                this.cardsetsChange.next(true);
              }
            },
          });
          this.uploadCardsetImage(updatedCardset.id, file);
        }
        const index = this._cardsets.findIndex(
          (cardset) => cardset.id === updatedCardset.id
        );
        this._cardsets[index] = updatedCardset;
      },
      error: (error) => {},
    });
  }

  public deleteCardset(id: number): void {
    this.cardsetApi.deleteByid(id).subscribe({
      next: () => {
        this._cardsets = this._cardsets.filter(
          (cardset) => Number(cardset.id) !== id
        );
        this.onDeleteCardsets.emit(true);
        this.cardsetsChange.next(true);
      },
      error: (error) => {},
    });
  }

  public uploadCardsetImage(id: number, file: any): void {
    let body: FormData = new FormData();
    body.append("imageCardset", file);
    this.cardsetApi.uploadImage(id, body).subscribe({
      next: (updatedCardset: any) => {
        const index = this._cardsets.findIndex(
          (cardset) => cardset.id === updatedCardset.id
        );
        this._cardsets[index] = updatedCardset;
        this.onUpdateCardsets.emit(true);
        this.cardsetsChange.next(true);
        this._pictureUpdated.next(true);
      },
      error: (error) => {},
      complete: () => {},
    });
  }
}
