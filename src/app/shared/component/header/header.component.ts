import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    // url for the logo
    public imageLogo: string = '../../../../assets/images/answerz-logo.png';

    constructor() { }
}
