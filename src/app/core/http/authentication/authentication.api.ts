import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Token } from '@app/core/models/Token'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class AuthenticationApi {
    constructor(private readonly http: HttpClient) {}

    public login(email: string, password: string): Observable<Token> {
        return this.http.post<Token>(environment.server + '/auth/login', {
            email,
            password,
        })
    }

    public logout(): Observable<any> {
        return this.http.post(environment.server + '/auth/logout', {})
    }
}
