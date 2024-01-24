import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-flashcards-set',
    templateUrl: './flashcards-set.component.html',
    styleUrls: ['./flashcards-set.component.scss']
})
export class FlashcardsSetComponent {

    @Input() public description: string | undefined;
    @Input() public title: string | undefined;
    @Input() public image: string | undefined;
}
