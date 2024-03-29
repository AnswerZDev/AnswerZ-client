import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {map, Observable} from "rxjs";
import {User} from "../../models/api/user";
import {HydraFactory} from "../../models/api/hydra/hydra.factory";
import {SecurityService} from "../../../shared/services/security.services";

@Injectable({
    providedIn: 'root',
})
export class UserApi extends ApiService {
    public constructor(    ) {
        super('user')
    }

    public current(): Observable<User> {
        let u = this.get('/me').pipe(
            map((data: any) => HydraFactory.createItem(User, data))
        )
        return u as unknown as Observable<User>
    }
}
