import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {map, Observable} from "rxjs";
import {User} from "../../models/api/user";
import {HydraFactory} from "../../models/api/hydra/hydra.factory";
import {SecurityService} from "../../../shared/services/security.services";
import {Flashcard} from "../../models/api/flashcard";
import { HttpClient } from "@angular/common/http";
import {Question} from "../../models/api/question";

@Injectable({
    providedIn: 'root',
})
export class QuestionApi extends ApiService {
    public constructor( ) {
        super('question');
    }

    public collection(): Observable<Question[]> {
        let u = this.get('/all-questions').pipe(
            map((data: any) => HydraFactory.createCollection(Question, data))
        );
        return u as unknown as Observable<Question[]>;
    }

    public create(question: Question): Observable<Question> {
        return this.post('/create-question', question).pipe(
            map((data: any) => HydraFactory.createItem(Question, data))
        );
    }
    
}
