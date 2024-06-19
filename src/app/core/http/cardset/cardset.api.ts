import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Observable, map } from "rxjs";
import { Cardset } from "../../models/api/cardset";
import { HydraFactory } from "../../models/api/hydra/hydra.factory";

@Injectable({
    providedIn: 'root',
})
export class CardsetApi extends ApiService {
    public constructor() {
        super('cardset')
    }

    public getMyCardsets(visibility: 'Private' | 'Public'): Observable<Cardset[]> {
        if(visibility === 'Private') {
            let f = this.get('/private').pipe(
                map((data: any) => HydraFactory.createCollection(Cardset, data))
            )
            return f as unknown as Observable<Cardset[]>
        } else {
            let f = this.get('/public').pipe(
                map((data: any) => HydraFactory.createCollection(Cardset, data))
            )
            return f as unknown as Observable<Cardset[]>
        }
    }

    public getOne(id: number): Observable<Cardset> {
        let f = this.get(`/${id}`, {
            headers: {
                'skip-cache': 'true'
            }
        }).pipe(
            map((data: any) => HydraFactory.createItem(Cardset, data))
        )
        return f as unknown as Observable<Cardset>
    }

    public create(data: any): Observable<Cardset> {
        let f = this.post('/', data).pipe(
            map((response: any) => HydraFactory.createItem(Cardset, response))
        )
        return f as unknown as Observable<Cardset>
    }

    public update(id: number, data: any): Observable<Cardset> {
        let f = this.patch(`/${id}`, data).pipe(
            map((response: any) => HydraFactory.createItem(Cardset, response))
        )
        return f as unknown as Observable<Cardset>
    }

    public deleteByid(id: number): Observable<Cardset> {
        let f = this.delete(`/${id}`).pipe(
            map((data: any) => HydraFactory.createItem(Cardset, data))
        )
        return f as unknown as Observable<Cardset>
    }

    public uploadImage(id: number, body: any): Observable<Cardset> {
        let f = this.post(`/upload-image-cardset/${id}`, body).pipe(
            map((response: any) => HydraFactory.createItem(Cardset, response))
        )
        return f as unknown as Observable<Cardset>
    }

    public getAllCardsetPublic(): Observable<Cardset[]> { // Observable qui retourne modele : USER
        let u = this.get('/all/public').pipe(
            map((data: any) => HydraFactory.createCollection(Cardset, data)) // model, data
        )
        return u as unknown as Observable<Cardset[]> // toujours retoruné comme ca avec <Model>
    }


}