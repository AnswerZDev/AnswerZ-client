import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    // url for the logo
    public imageLogo: string = '../../../../assets/images/answerz-logo.png';

    constructor(
        private readonly router: Router,
    ) { }

    /**
     * @author @thdupin2
     * @date 29/10/2023
     * @description Navigation to the Home page.
     * @memberof HeaderComponent
     */
    redirectToHomePage(): void {
        this.router.navigate(['/']);
    }

    /**
     * @author @thdupin2
     * @date 29/10/2023
     * @description Navigation to the Login page.
     * @memberof HeaderComponent
     */
    redirectToLoginPage(): void {
        this.router.navigate(['/auth/login']);
    }

    /**
     * @author @thdupin2
     * @date 29/10/2023
     * @description Navigation to the Register page.
     * @memberof HeaderComponent
     */
    redirectToRegisterPage(): void {
        this.router.navigate(['/auth/register']);
    }
}
