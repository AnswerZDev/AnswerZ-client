import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AnswerZ-client';
    showFooter: boolean = true;

    public onComponentLoad() { }

    /* Petite stratégie pour ne pas avoir le footer sur les pages souhaitées */
    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.showFooter = !event.url.includes('flashcards/create-flashcard');
        }
        });
    }
}
