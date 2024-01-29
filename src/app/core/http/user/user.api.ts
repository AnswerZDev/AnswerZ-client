import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {map, Observable} from "rxjs";
import {User} from "../../models/api/user";
import {HydraFactory} from "../../models/api/hydra/hydra.factory";

@Injectable({
    providedIn: 'root',
})
export class UserApi extends ApiService {
    public constructor() {
        super('users') // nom du controller de NestJS
    }

    // Fonction par route comme ceci
    public current(): Observable<User> { // Observable qui retourne modele : USER
        let u = this.get('/me').pipe(
            map((data: any) => HydraFactory.createItem(User, data)) // model, data
        )
        return u as unknown as Observable<User> // toujours retoruné comme ca avec <Model>
    }
}
