import {NgModule, Optional, SkipSelf} from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {SlashInterceptor} from "./interceptors/slash.interceptor";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {throwIfAlreadyLoaded} from "./module-import-guard";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SlashInterceptor, multi: true },
    ],
    declarations: [],
    exports: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule')
    }
}
