import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {map, Observable} from "rxjs";
import {User} from "../../models/api/user";
import {HydraFactory} from "../../models/api/hydra/hydra.factory";
import {SecurityService} from "../../../shared/services/security.services";
import {Flashcard} from "../../models/api/flashcard";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class UserApi extends ApiService {
    public constructor( ) {
        super('user');
    }

    public current(): Observable<User> {
        let u = this.get('/me', {
            headers: {
                'skip-cache': 'true',
                'Cache-Control': 'no-store'
            }
        }).pipe(
            map((data: any) => HydraFactory.createItem(User, data))
        )
        return u as unknown as Observable<User>
    }

    public uploadPhoto(data: any): Observable<any> {
        let cb: Observable<any> = this.post('/upload-photo', data);
        return cb as unknown as Observable<any>;
    }
    
}
