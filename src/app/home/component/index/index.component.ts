import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
    constructor(private readonly router: Router) { }

    /**
     * @author @HugoooR
     * @date 24/01/2024
     * @description Navigation to the Login page.
     * @memberof HomePage
     */
    redirectToLoginPage(): void {
        this.router.navigate(['/auth/login']);
    }


    /**
     * @author @HugoooR
     * @date 24/01/2024
     * @description Navigation to the GitHub page.
     * @memberof HomePage
     */
    redirectToGithubPage(): void {
        window.open("https://github.com/AnswerZDev/AnswerZ", "_blank");
    }

    tabCardSet = [];

}
