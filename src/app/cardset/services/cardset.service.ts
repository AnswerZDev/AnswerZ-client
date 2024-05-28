import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { CardsetApi } from "src/app/core/http/cardset/cardset.api";
import { Cardset } from "src/app/core/models/api/cardset";

@Injectable({
    providedIn: 'root',
})
export class CardsetService{

    private _cardsets: Cardset[] = [];
    private cardset_play!: Cardset;

    constructor(private readonly api_cardset: CardsetApi) {
    }

    get cardsets(): Cardset[] {
        return this._cardsets;
    }

    get cardsetPlay(){
        return this.cardset_play;
    }

    setcardsetPlay(cardset: Cardset){
        this.cardset_play = cardset;
    }

    getAllCardset(): void{
        // return this.api_cardset.all_collection();
        this.api_cardset.all_collection().subscribe({
            next: (data: any) => {
                this._cardsets = data.member;
            },
            error: () => {
            }
        });
    }


    getAllCardsetPublic(): void{
        // return this.api_cardset.all_collection();
        this.api_cardset.all_collection().subscribe({
            next: (data: any) => {
                this._cardsets = data.member;
            },
            error: () => {
            }
        });
    }

    getOneCardset(){
        // return this.api_cardset.all_collection();
        return this.api_cardset.one_cardset();
    }

    // getAllCardset(): Observable<any> {
    //    // return this.http.get(`${this.baseUrl}`);
    // }

}