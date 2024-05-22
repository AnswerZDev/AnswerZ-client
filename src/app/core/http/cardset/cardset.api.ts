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
        let f = this.get(`/${id}`).pipe(
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

    public createImage(body: any): Observable<Cardset> {
        let f = this.post('/create-image-cardset', body).pipe(
            map((response) => HydraFactory.createItem(Cardset, response))
        );
        return f as unknown as Observable<Cardset>
    }

    public uploadImage(id: number, body: FormData): Observable<Cardset> {
        let f = this.patch(`/upload-image-cardset/${id}`, body).pipe(
            map((response: any) => HydraFactory.createItem(Cardset, response))
        )
        return f as unknown as Observable<Cardset>
    }
}