import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})

export class ForgotPasswordComponent {
    constructor(private readonly router: Router) { }

    /**
     * @author @HugoooR
     * @date 31/01/2024
     * @description Navigation to the Login page.
     * @memberof HomePage
     */
    redirectToLoginPage(): void {
        this.router.navigate(['/auth/login']);
    }

    public email = "Email";

}
