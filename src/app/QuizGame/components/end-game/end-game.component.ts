import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent {

  constructor(private readonly _router: Router) { }

  redirectToMyQuiz() {
    this._router.navigate(['/quiz-game/my-quiz']);
  }
}
