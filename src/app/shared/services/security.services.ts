import {EventEmitter, Injectable} from '@angular/core'
import {JWT, JWTService} from "../../core/services/jwt.service";
import {AuthenticationApi} from "../../core/http/authentication/authentication.api";
import {Router} from "@angular/router";
import {UserApi} from "../../core/http/user/user.api";
import {Subject} from "rxjs";
import {User} from "../../core/models/api/user";
import {ToastService} from "./toast.service";

@Injectable({
    providedIn: 'root',
})
export class SecurityService {

    /**
     * JWT object
     * @author @Alexis1663
     * @private _jwt { JWT | undefined } JWT object is undefined by default and will be set(in localstorage) when the user logs in
     * @memberof SecurityService
     */
    private _jwt: JWT | undefined

    public onSuccessSignin: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor(
        private readonly authentificationApi: AuthenticationApi,
        private readonly userApi: UserApi,
        private readonly router: Router,
    ) {}

    /**
     * Subject to notify when the user is loaded
     * @author @Alexis1663
     * @private _userLoad { Subject<boolean> } Subject to notify when the user is loaded
     * @memberof SecurityService
     */
    private _userLoad: Subject<boolean> = new Subject<boolean>()


    /**
     * Getter for the userLoad subject
     * @author @Alexis1663
     * @returns { Subject<boolean> } Subject to notify when the user is loaded
     * @memberof SecurityService
     */
    get userLoad(): Subject<boolean> {
        return this._userLoad
    }

    /**
     * Boolean to know if the user is loading
     * @author @Alexis1663
     * @private _loadingUser { boolean } Boolean to know if the user is loading
     * @memberof SecurityService
     */
    private _loadingUser: boolean = false;

    /**
     * Getter for the loadingUser boolean
     * @author @Alexis1663
     * @returns { boolean } Boolean to know if the user is loading
     * @memberof SecurityService
     */
    get loadingUser(): boolean {
        return this._loadingUser
    }

    /**
     * User object
     * @author @Alexis1663
     * @private _user { User | undefined } User object is undefined by default and will be set when the user logs in
     * @memberof SecurityService
     */
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

    public updateUser(): void{
         this._loadingUser = true
         this.userApi.current().subscribe({
             next: (user) => {
                 this._user = user
                 this._loadingUser = false
                 this._userLoad.next(true)
             },
             error: () => {},
         });
     }

    public load() {
        if (this.token) {
            this._jwt = JWTService.parseJWT(this.token)
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
            error: () => {
                this.onSuccessSignin.emit(false)
            },
        })
        return loginSubscription
    }

    logout() {
        this.token = undefined
        this._jwt = undefined
        this._user = undefined
        this.router.navigate(['/auth/login']).then()
    }

    isAuthenticated() {
        return this._user !== undefined
    }

    private loadUser(): void {
        this._loadingUser = true
        this.userApi.current().subscribe({
            next: (user: User) => {
                this._user = user
                this._loadingUser = false
                this._userLoad.next(true)
            },
            error: () => {

            },
        })
    }

    private addTimeoutLogout() {
        if (this._jwt) {
            setTimeout(() => {
                this.logout()
            }, this._jwt.exp * 1000 - Date.now())
        }
    }
}
