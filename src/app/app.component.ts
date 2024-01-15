import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AnswerZ-client';

    public onComponentLoad() { }

    /* Petite stratégie pour ne pas avoir le footer sur les pages souhaitées */
    constructor(private router: Router) {}
}
