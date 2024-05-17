import {inject} from '@angular/core'
import {Router} from '@angular/router'
import {AppService} from "../../shared/services/appService.service";
import {SecurityService} from "../../shared/services/security.services";

let router: Router | undefined = undefined

export const userGuard = () => {
    const appService = inject(AppService);
    router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
        router.navigate(['/auth/login']).then();
        return false;
    }
    return true;
}