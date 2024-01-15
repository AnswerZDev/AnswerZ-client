import {NgModule, Optional, SkipSelf} from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {throwIfAlreadyLoaded} from '@app/core/module-import-guard'
import {TokenInterceptor} from '@app/core/interceptors/token.interceptor'
import {CacheInterceptor} from '@app/core/interceptors/cache.interceptor'
import {ApplicationInterceptor} from '@app/core/interceptors/application.interceptor'
import {SlashInterceptor} from '@app/core/interceptors/slash.interceptor'
import {PatchInterceptor} from '@app/core/interceptors/patch.interceptor'

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApplicationInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SlashInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: PatchInterceptor, multi: true }
    ],
    declarations: [],
    exports: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule')
    }
}
