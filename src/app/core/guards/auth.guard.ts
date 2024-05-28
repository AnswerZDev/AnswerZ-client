import { inject } from '@angular/core'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import {SecurityService} from "../../shared/services/security.services";

export const authGuard = () => {
    const security = inject(SecurityService)
    const router = inject(Router)

    let subject = new Subject<boolean>()

    if (security.loadingUser) {
        security.userLoad.subscribe(() => {
            subject.next(security.user !== undefined)
        })
    } else {
        subject.next(security.user !== undefined)
    }

    subject.subscribe((value) => {
        if (!value) {
            router.navigate(['/auth/login']).then()
        }
    })
    return subject.asObservable()
}
