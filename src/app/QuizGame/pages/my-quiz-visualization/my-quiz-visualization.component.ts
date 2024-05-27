import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuisGameService } from '../../services/quizGame.service';

@Component({
  selector: 'app-my-quiz-visualization',
  templateUrl: './my-quiz-visualization.component.html',
  styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent {

  modesVisibilite: any[]|undefined;
  selectedModeVisibilities: any;

  constructor(
    private router: Router,
    public readonly quizGameService: QuisGameService
  ){

  }

  ngOnInit(){
    this.quizGameService.getQuizGameByUser(1);
  }

  redirectToCreateFlashcardSet() {
    this.router.navigateByUrl('/quiz-game/quiz-edit')
  }

}
