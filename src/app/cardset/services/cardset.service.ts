import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardsetApi } from "src/app/core/http/cardset/cardset.api";
import { ApiService } from "src/app/core/services/api.service";

@Injectable({
    providedIn: 'root',
})
export class CardsetService{

    constructor(private api_cardset: CardsetApi) {
    }

    getAllCardset(){
        return this.api_cardset.all_collection();
    }

    // getAllCardset(): Observable<any> {
    //    // return this.http.get(`${this.baseUrl}`);
    // }

}