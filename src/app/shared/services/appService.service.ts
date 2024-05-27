import {EventEmitter, Injectable} from '@angular/core';
import {SecurityService} from "./security.services";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(
        private readonly _securityService: SecurityService,
        private readonly _translate: TranslateService
    ) {
    }

    private isApplicationLoaded = false

    private _applicationLoad: EventEmitter<any> = new EventEmitter()

    get applicationLoad(): EventEmitter<any> {
        return this._applicationLoad
    }

    public loadApplication() {
        this._securityService.load();
        this._applicationLoad.emit();
        this.isApplicationLoaded = true;
        this.initTranslation();
    }

    public applicationIsLoaded(): boolean {
        return this.isApplicationLoaded
    }

    private initTranslation(): void {
        const lang: string | null = localStorage.getItem('language');
        if (lang) {
            this._translate.setDefaultLang(lang);
        }
    }
}
