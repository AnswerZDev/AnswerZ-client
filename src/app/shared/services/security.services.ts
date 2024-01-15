import { Injectable } from '@angular/core'
import {JWT, JWTService} from "../../core/services/jwt.service";
import {AuthenticationApi} from "../../core/http/authentication/authentication.api";
import {Router} from "@angular/router";
import {UserApi} from "../../core/http/user/user.api";
import {Subject} from "rxjs";
import {User} from "../../core/models/api/user";

@Injectable({
    providedIn: 'root',
})
export class SecurityService {
    private jwt: JWT | undefined

    constructor(
        private readonly authentificationApi: AuthenticationApi,
        private readonly userApi: UserApi,
        private readonly router: Router
    ) {}

    private _userLoad: Subject<boolean> = new Subject<boolean>()

    get userLoad(): Subject<boolean> {
        return this._userLoad
    }

    private _loadingUser: boolean = false

    get loadingUser(): boolean {
        return this._loadingUser
    }

    private _user: User | undefined

    get user(): User | undefined {
        return this._user
    }

    private _token: string | undefined

    get token(): string | undefined {
        return this._token || (localStorage.getItem('token') ?? undefined)
    }

    set token(value: string | undefined) {
        this._token = value
        localStorage.setItem('token', value ?? '')
    }

    // public updateUser(){
    //     if (this.jwt?.roles.includes('ROLE_USER')) {
    //         this._loadingUser = true
    //         this.userApi.current().subscribe({
    //             next: (user) => {
    //                 console.log(user)
    //                 this._user = user
    //                 this._loadingUser = false
    //                 this._userLoad.next(true)
    //             },
    //             error: () => {},
    //         })
    //     }
    // }

    public load() {
        if (this.token) {
            this.jwt = JWTService.parseJWT(this.token)
            this.addTimeoutLogout()
            this.loadUser()
        }
    }

    login(email: string, password: string) {
        let loginSubscription = this.authentificationApi.login(email, password)
        loginSubscription.subscribe({
            next: (token) => {
                this.token = token.token
                this.load()
            },
            error: () => {},
        })
        return loginSubscription
    }

    logout() {
        this.token = undefined
        this.jwt = undefined
        this._user = undefined
        this.router.navigate(['/auth/login']).then()
    }

    isAuthenticated() {
        return this._user !== undefined
    }

    private loadUser() {
        /*if (this.jwt?.roles.includes('ROLE_USER')) {
            this._loadingUser = true
            this.userApi.current().subscribe({
                next: (user) => {
                    this._user = user
                    this._loadingUser = false
                    this._userLoad.next(true)
                },
                error: () => {},
            })
        }*/
    }

    private addTimeoutLogout() {
        if (this.jwt) {
            setTimeout(() => {
                this.logout()
            }, this.jwt.exp * 1000 - Date.now())
        }
    }
}
