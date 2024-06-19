import {EventEmitter, Injectable} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, Subject} from "rxjs";
import {CardsetApi} from "src/app/core/http/cardset/cardset.api";
import {Cardset} from "src/app/core/models/api/cardset";
import {Router} from "@angular/router";

export interface Mode {
    name: string;
}

@Injectable({
    providedIn: "root",
})
export class CardsetService {
    cardsetForm!: FormGroup;
    public onReceiveCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onCreateCardsets: EventEmitter<any> = new EventEmitter<any>();
    public onUpdateCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onDeleteCardsets: EventEmitter<boolean> = new EventEmitter<boolean>();
    public onUploadImage: EventEmitter<boolean> = new EventEmitter<boolean>();
    private cardset_play!: Cardset;
    private _pictureUpdated: Subject<number> = new Subject<number>();

    public constructor(public readonly cardsetApi: CardsetApi, private readonly _router: Router) {
        this.cardsetForm = new FormGroup({
            image: new FormControl<File | null>(null),
            name: new FormControl<string | null>(null),
            description: new FormControl<string | null>(null),
            selectedCategory: new FormControl<Mode | null>(null),
            selectedVisibility: new FormControl<Mode | null>(null),
        });
    }

    private _cardsets: Cardset[] = [];

    get cardsets(): Cardset[] {
        return this._cardsets;
    }

    private _cardsetsChange: Subject<boolean> = new Subject<boolean>();

    get cardsetsChange(): Subject<boolean> {
        return this._cardsetsChange;
    }

    get cardsetPlay() {
        return this.cardset_play;
    }

    setcardsetPlay(cardset: Cardset) {
        this.cardset_play = cardset;
    }

    public getMyPrivateCardsets(): void {
        this.cardsetApi.getMyCardsets("Private").subscribe({
            next: (data: any) => {
                this._cardsets = data.member;
                this.onReceiveCardsets.emit(true);
                this.cardsetsChange.next(true);
            },
            error: (error) => {
            },
        });
    }

    public getMyPublicCardsets(): void {
        this.cardsetApi.getMyCardsets("Public").subscribe({
            next: (data: any) => {
                this._cardsets = data.member;
                this.onReceiveCardsets.emit(true);
                this.cardsetsChange.next(true);
            },
            error: (error) => {
            },
        });
    }

    public getCardsetById(id: number): Observable<any> {
        return this.cardsetApi.getOne(id).pipe(
            map((cardset) => {
                return cardset;
            })
        );
    }

    getAllCardsetPublic(): void {
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
            error: (error) => {
            },
        });
    }

    public updateCardset(id: number, data: any, file?: File): void {
        this.cardsetApi.update(id, data).subscribe({
            next: (updatedCardset: any) => {
                const index = this._cardsets.findIndex((cardset) => cardset.id === updatedCardset.id);
                if (index !== -1) {
                    this._cardsets[index] = updatedCardset;
                }
                if (file) {
                    this.uploadCardsetImage(updatedCardset.id, file).subscribe({
                        next: () => {
                            this.onUpdateCardsets.emit(true);
                            this.cardsetsChange.next(true);
                        },
                    });
                } else {
                    this.onUpdateCardsets.emit(true);
                    this.cardsetsChange.next(true);
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    public deleteCardset(id: number): void {
        this.cardsetApi.deleteByid(id).subscribe({
            next: () => {
                this._cardsets = this._cardsets.filter((cardset) => Number(cardset.id) !== id);
                this.onDeleteCardsets.emit(true);
                this.cardsetsChange.next(true);
            },
            error: (error) => {
            },
        });
    }

    public uploadCardsetImage(id: number, file: any): Subject<number> {
        let body: FormData = new FormData();
        body.append("imageCardset", file);
        this.cardsetApi.uploadImage(id, body).subscribe({
            next: (cardset: any) => {
                this._pictureUpdated.next(cardset.id);
            },
            error: (error) => {
                console.dir(error)
            }
        });
        return this._pictureUpdated;
    }
}
