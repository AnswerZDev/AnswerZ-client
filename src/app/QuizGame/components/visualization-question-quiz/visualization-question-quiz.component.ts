import { Component, Input } from '@angular/core';
import { QuestionQuiz } from '../../pages/quiz-edit/quiz-edit.component';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-visualization-question-quiz',
  templateUrl: './visualization-question-quiz.component.html',
  styleUrls: ['./visualization-question-quiz.component.scss']
})
export class VisualizationQuestionQuizComponent {

  time: any[]|undefined;
  point: any[]|undefined;
  selectedtime: any;
  selectedpoint: any;
  visible: boolean = false;

  @Input() my_question!: QuestionQuiz; 

  onDeleteQuestion() {
    console.log("romain");
  }

  showDialog() {
    this.visible = true;
  }

  onRedirigeToPagePlay() {
    throw new Error('Method not implemented.');
  }

  onPointChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  onTimeChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  saveModification() {
    throw new Error('Method not implemented.');
  }
}
