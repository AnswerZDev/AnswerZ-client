import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Observable, map } from "rxjs";
import { HydraFactory } from "../../models/api/hydra/hydra.factory";
import { Quiz } from "../../models/api/quiz";

@Injectable({
    providedIn: 'root',
})
export class QuizApi extends ApiService {
    public constructor() {
        super('quiz')
    }

    public create(data: any): Observable<Quiz> {
        let f = this.post('/create-quiz', data).pipe(
            map((response: any) => HydraFactory.createItem(Quiz, response))
        )
        return f as unknown as Observable<Quiz>
    }

    public update(id: number, data: any): Observable<Quiz> {
        let f = this.patch(`/${id}`, data).pipe(
            map((response: any) => HydraFactory.createItem(Quiz, response))
        )
        return f as unknown as Observable<Quiz>
    }

    public uploadImage(body: FormData): Observable<Quiz> {
        let f = this.post(`/upload-image-quiz`, body).pipe(
            map((response: any) => HydraFactory.createItem(Quiz, response))
        )
        return f as unknown as Observable<Quiz>
    }
}