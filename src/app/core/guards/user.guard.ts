import { inject } from '@angular/core'
import { Router } from '@angular/router'
import {AppService} from "../../shared/services/appService.service";
import {SecurityService} from "../../shared/services/security.services";

let router: Router | undefined = undefined

export const userGuard = () => {
    const security = inject(SecurityService)
    const router = inject(Router)

    if (security.isAuthenticated() || security.userLoad || security.loadingUser) {
        return true;
    }
    // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
    router.navigate(['/auth/login']);
    return false;
}