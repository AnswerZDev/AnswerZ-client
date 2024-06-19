import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from 'src/app/core/models/api/quiz';

@Component({
  selector: 'app-my-quiz-visualization',
  templateUrl: './my-quiz-visualization.component.html',
  styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent {

  modesVisibilite: any[]|undefined;
  selectedModeVisibilities: any;

  constructor(
    private readonly _router: Router,
    private readonly quizService: QuizService,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.initQuizList();
}

  public get quiz_list(): Quiz[] | undefined {
    return this.quizService.quiz_list;
  }

  public createQuiz(){
    this._router.navigate(["/quiz-game/create-quiz"]);
  }

  private initQuizList(): void {
    this.route.params.subscribe(params => {
        const userId = params['userId'];
        this.quizService.getAllQuizByUser().subscribe({
            next: (quiz: Quiz) => {

            }
        });
    });
}

}
