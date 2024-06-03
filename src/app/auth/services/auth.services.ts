import {EventEmitter, Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { AuthenticationApi } from 'src/app/core/http/authentication/authentication.api';
import { Token } from 'src/app/core/models/token/token';
import {SecurityService} from "../../shared/services/security.services";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _resetPasswordObservable: Subject<boolean> = new Subject<boolean>();

    public onSignUpEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    get resetPasswordObservable(): Subject<boolean> {
        return this._resetPasswordObservable;
    }

    constructor(
        private readonly authApi: AuthenticationApi,
        private readonly securityService: SecurityService,
    ) { }

    public forgotPassword(email: string): void {
        this.authApi.forgotPassword(email).subscribe({
            next: () => {
                this._resetPasswordObservable.next(true);
            },
            error: (error) => {
                this._resetPasswordObservable.next(false);
            }
        });
    }

    public register(signUpForm: FormGroup): void {
        this.authApi.register(signUpForm.value).subscribe({
            next: (token) => {
                this.securityService.token = token.token;
                this.securityService.load();
                this.onSignUpEmitter.emit(true);
            },
            error: () => {
                this.onSignUpEmitter.emit(false);
            }
        });
    }
}
