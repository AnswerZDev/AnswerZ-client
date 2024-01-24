import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class SlashInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url.endsWith('/')) {
            const newRequest = request.clone({
                url: request.url.slice(0, -1),
            })
            return next.handle(newRequest)
        }
        return next.handle(request)
    }
}
