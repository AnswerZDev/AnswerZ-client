import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Cardset } from "../../models/api/cardset";
import { Observable, map } from "rxjs";
import { HydraFactory } from "../../models/api/hydra/hydra.factory";

@Injectable({
    providedIn: 'root',
})
export class CardsetApi extends ApiService {

    public constructor() {
        super('Cardset') // nom du controller de NestJS
    }

    // Fonction par route comme ceci
    public all_collection(): Observable<Cardset[]> { // Observable qui retourne modele : USER
        let u = this.get('/').pipe(
            map((data: any) => HydraFactory.createCollection(Cardset, data)) // model, data
        )
        return u as unknown as Observable<Cardset[]> // toujours retoruné comme ca avec <Model>
    }

    public one_cardset(): Observable<Cardset> { // Observable qui retourne modele : USER
        let u = this.get('/one').pipe(
            map((data: any) => HydraFactory.createItem(Cardset, data)) // model, data
        )
        return u as unknown as Observable<Cardset> // toujours retoruné comme ca avec <Model>
    }
}