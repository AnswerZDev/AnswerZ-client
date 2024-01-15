import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationApi } from 'src/app/core/http/authentication/authentication.api';
import { Token } from 'src/app/core/models/token/token';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private authApi: AuthenticationApi) { }

    public login(email: string, password: string): void {
        //this.token = this.authApi.login(email, password);
    }
}
