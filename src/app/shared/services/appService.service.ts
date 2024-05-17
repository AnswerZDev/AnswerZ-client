import { EventEmitter, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'
import {SecurityService} from "./security.services";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(
        private readonly messageService: MessageService,
        private readonly router: Router,
        private readonly securityService: SecurityService,
    ) {}

    private isApplicationLoaded = false

    private _applicationLoad: EventEmitter<any> = new EventEmitter()

    get applicationLoad(): EventEmitter<any> {
        return this._applicationLoad
    }

    public loadApplication() {
        this.securityService.load()
        this._applicationLoad.emit()
        this.isApplicationLoaded = true
    }

    public applicationIsLoaded(): boolean {
        return this.isApplicationLoaded
    }
}
