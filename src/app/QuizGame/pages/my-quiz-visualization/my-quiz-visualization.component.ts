import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from 'src/app/core/models/api/quiz';
import { Mode } from '../quiz-edit/quiz-edit.component';

@Component({
  selector: 'app-my-quiz-visualization',
  templateUrl: './my-quiz-visualization.component.html',
  styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent {

  selectedModeVisibilities: Mode = { name: 'Private' };
  modesVisibilite: Mode[] | undefined;



  constructor(
    private readonly _router: Router,
    private readonly quizService: QuizService,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.modesVisibilite = [
      { name: 'Private' },
      { name: 'Public' }
    ];
    this.initQuizList(this.selectedModeVisibilities?.name);
}

  public get quiz_list(): Quiz[] | undefined {
    return this.quizService.quiz_list;
  }

  public createQuiz(){
    this._router.navigate(["/quiz-game/create-quiz"]);
  }

  private initQuizList(visibility: string): void {
    this.route.params.subscribe(params => {
        this.quizService.getAllQuizByUser(visibility).subscribe({
            next: (quiz: Quiz) => {

            }
        });
    });
  }

  onVisibilityChange(event: any) {
    if(event.value['name'] === 'Public') {
      this.initQuizList('Public');
    } else {
      this.initQuizList('Private');
    }
  }

}
