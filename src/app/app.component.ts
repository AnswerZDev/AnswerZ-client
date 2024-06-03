import { Component } from '@angular/core';
import {AppService} from "./shared/services/appService.service";
import {Message, MessageService} from "primeng/api";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService]
})
export class AppComponent {
    title = 'AnswerZ-client';

    messages: Message[] = [
        {
            severity: 'warn',
            summary: 'Chargement',
            detail: 'Application en cours de chargement'
        }
    ];

    public onComponentLoad() { }

    /* Petite stratégie pour ne pas avoir le footer sur les pages souhaitées */
    constructor(
        private readonly applicationService: AppService,
    ) {
        this.applicationService.loadApplication();
    }

    public isReady() {
        return this.applicationService.applicationIsLoaded()
    }
}
