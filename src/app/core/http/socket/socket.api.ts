import {Injectable} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {map, Observable} from "rxjs";
import {User} from "../../models/api/user";
import {HydraFactory} from "../../models/api/hydra/hydra.factory";
import {SecurityService} from "../../../shared/services/security.services";
import {Flashcard} from "../../models/api/flashcard";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class SocketApi {
    public constructor(private readonly _httpClient: HttpClient) {
    }

    public getUserInfos(): Observable<void> {
        return this._httpClient.get<void>(environment.socketServer + '/socket/user-infos')
    }
}
