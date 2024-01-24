import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import {SecurityService} from "../../shared/services/security.services";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly securityService: SecurityService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.securityService.token) {
            const newRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.securityService.token}`,
                },
            })

            return next.handle(newRequest)
        } else {
            return next.handle(request)
        }
    }
}
