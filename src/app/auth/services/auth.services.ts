import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { AuthenticationApi } from 'src/app/core/http/authentication/authentication.api';
import { Token } from 'src/app/core/models/token/token';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _resetPasswordObservable: Subject<boolean> = new Subject<boolean>();

    get resetPasswordObservable(): Subject<boolean> {
        return this._resetPasswordObservable;
    }

    constructor(private authApi: AuthenticationApi) { }

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

    public register(signUpForm: FormGroup): Subject<void> {
        const subject: Subject<void> = new Subject<void>();
        this.authApi.register(signUpForm.value).subscribe({
            next: () => {
                subject.next();
            },
            error: (error) => {
                subject.error(error);
            }
        });
        return subject;
    }
}
