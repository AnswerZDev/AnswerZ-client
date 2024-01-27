import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";

@Injectable({
    providedIn: 'root',
})
export class CardsetService extends ApiService{

    constructor(override http: HttpClient) {
        super('');
    }

    getAllCardset(){
        return this.get('Cardset');
    }

    // getAllCardset(): Observable<any> {
    //    // return this.http.get(`${this.baseUrl}`);
    // }

}