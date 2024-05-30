import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {SecurityService} from "../../services/security.services";
import {MenuItem} from "primeng/api";
import { AppService } from '../../services/appService.service';
import { userGuard } from 'src/app/core/guards/user.guard';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    // url for the logo
    public imageLogo: string = '../../../../assets/images/answerz-logo.png';

    showButtons = false;
    isAuthenticated = false;

    items: MenuItem[] | undefined;

    constructor(
        private readonly router: Router,
        public readonly securityService: SecurityService
    ) {
        this.initializeApp();
    }

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

    /**
     * @author @Alexis1663
     * @date 31/01/2024
     * @description Initialized profile menu data
     * @memberof HeaderComponent
     */
    private initializeApp() : void {
        this.items = [
            {
                label: 'Mon profil',
                icon: 'pi pi-user',
                routerLink: ['/user/profile']
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.securityService.logout();
                }
            }
        ];
    }

    redirectToQuizGame() {
        this.router.navigateByUrl('/quiz-game');
    }

    redirectToCardset() {
        this.router.navigateByUrl('/cardset');
    }
}
