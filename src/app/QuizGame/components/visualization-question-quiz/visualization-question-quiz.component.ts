import { Component, Input } from '@angular/core';
import { QuestionQuiz } from '../../pages/quiz-edit/quiz-edit.component';

@Component({
  selector: 'app-visualization-question-quiz',
  templateUrl: './visualization-question-quiz.component.html',
  styleUrls: ['./visualization-question-quiz.component.scss']
})
export class VisualizationQuestionQuizComponent {

  @Input() my_question!: QuestionQuiz; 

  onDeleteQuestion() {
    console.log("romain");
  }
}
