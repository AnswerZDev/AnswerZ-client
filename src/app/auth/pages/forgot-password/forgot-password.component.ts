import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationApi} from "../../../core/http/authentication/authentication.api";
import {AuthService} from "../../services/auth.services";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

    public authForm: FormGroup = new FormGroup({
        email: new FormControl(undefined, [Validators.required, Validators.email]),
    });
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly toastService: ToastService,
    ) { }

    ngOnInit(): void {
        this.onResetPasswordSubscriber();
    }

    /**
     * @author @Alexis1663
     * @date 31/01/2024
     * @description Event Subscriber to show toast confirmation
     */
    private onResetPasswordSubscriber(): void {
        this.authService.resetPasswordObservable.subscribe({
            next: (value) => {
                if(value) {
                    this.toastService.toast('success', 'Success', 'Reset password email sent');
                }else {
                    this.toastService.toast('error', 'Error', 'Reset password email not sent');
                }
            }
        });
    }

    /**
     * @author @HugoooR
     * @date 31/01/2024
     * @description Navigation to the Login page.
     * @memberof HomePage
     */
    redirectToLoginPage(): void {
        this.router.navigate(['/auth/login']);
    }

    resetPassword(): void {
        if(this.authForm.valid) {
            this.authService.forgotPassword(this.authForm.controls['email'].value);
        }
    }

}
