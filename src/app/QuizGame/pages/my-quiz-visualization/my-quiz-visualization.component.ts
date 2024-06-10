import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuisGameService, QuizGame } from '../../services/quizGame.service';

@Component({
  selector: 'app-my-quiz-visualization',
  templateUrl: './my-quiz-visualization.component.html',
  styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent {

  modesVisibilite: any[]|undefined;
  selectedModeVisibilities: any;
  quizGameCreate?: QuizGame;

  constructor(
    private router: Router,
    public readonly quizGameService: QuisGameService
  ){

  }

  ngOnInit(){
    this.quizGameService.getQuizGameByUser(1);
  }

  redirectToEditQuizGame(quiz: QuizGame) {
    this.quizGameService.setQuizgamePlay(quiz);
    this.router.navigateByUrl('/quiz-game/quiz-edit')
  }

  redirectToCreateQuizGame() {
    this.quizGameCreate = this.quizGameService.createQuizGame();
    this.quizGameService.setQuizgamePlay(this.quizGameCreate);
    this.router.navigate(["/quiz-game/create-quiz"])
  }

}
