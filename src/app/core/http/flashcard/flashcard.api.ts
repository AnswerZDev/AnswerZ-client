import { Injectable } from "@angular/core"
import { ApiService } from "../../services/api.service"
import { Observable, map } from "rxjs"
import { HydraFactory } from "../../models/api/hydra/hydra.factory"
import { Flashcard } from "../../models/api/flashcard"

@Injectable({
    providedIn: 'root',
})
export class FlashcardApi extends ApiService {
    public constructor() {
        super('flashcard')
    }

    public getAll(): Observable<Flashcard> {
        let f = this.get('/').pipe(
            map((data: any) => HydraFactory.createCollection(Flashcard, data))
        )
        return f as unknown as Observable<Flashcard>
    }

    public getOne(id: number): Observable<Flashcard> {
        let f = this.get(`/${id}`).pipe(
            map((data: any) => HydraFactory.createItem(Flashcard, data))
        )
        return f as unknown as Observable<Flashcard>
    }

    public getAllFlashcardByCardsetId(cardsetId: number): Observable<Flashcard> {
        let f = this.get(`/cardset/${cardsetId}`).pipe(
            map((data: any) => HydraFactory.createCollection(Flashcard, data))
        )
        return f as unknown as Observable<Flashcard>
    }

    public create(data: any): Observable<Flashcard> {
        let f = this.post('/', data).pipe(
            map((response: any) => HydraFactory.createItem(Flashcard, response) as Flashcard)
        )
        return f as unknown as Observable<Flashcard>
    }

    public update(id: number, data: any): Observable<Flashcard> {
        
        let f = this.patch(`/${id}`, data).pipe(
            map((response: any) => HydraFactory.createItem(Flashcard, response) as Flashcard)
        )
        return f as unknown as Observable<Flashcard>
    }

    public deleteByid(id: number): Observable<Flashcard> {
        let f = this.delete(`/${id}`).pipe(
            map((data: any) => HydraFactory.createItem(Flashcard, data))
        )
        return f as unknown as Observable<Flashcard>
    }
}