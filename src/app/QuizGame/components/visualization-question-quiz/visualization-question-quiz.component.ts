import { Component, Input } from '@angular/core';
import { QuestionQuiz } from '../../pages/quiz-edit/quiz-edit.component';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Router } from '@angular/router';


export interface Time {
  time : number;
}

export interface Point {
  point: number;
}


@Component({
  selector: 'app-visualization-question-quiz',
  templateUrl: './visualization-question-quiz.component.html',
  styleUrls: ['./visualization-question-quiz.component.scss']
})
export class VisualizationQuestionQuizComponent {

  selectedtime: Time = { time: 10 };
  selectedpoint: Point = { point: 100 };
  time: Time[] = [];
  point: Point[] = [];
  visible: boolean = false;

  @Input() my_question!: QuestionQuiz; 

  constructor(
    private router: Router
  ){

  }

  ngOnInit(){
    this.time = [
      { time: 5 },
      { time: 10 },
      { time: 11 },
      { time: 12 },
      { time: 13 },
      { time: 14 },
      { time: 15 },
      { time: 20 },
    ];

    this.point = [
      { point: 100 },
      { point: 200 },
      { point: 300 },
      { point: 400 },
      { point: 500 },
      { point: 600 },
      { point: 700 },
      { point: 800 },
      { point: 900 },
      { point: 100 },
    ];
  }

  onDeleteQuestion() {

    console.log("romain");
  }

  showDialog() {
    this.visible = true;
  }

  onRedirigeToPagePlay() {
    this.router.navigateByUrl('/quiz-game/game/1');
  }

  onPointChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  onTimeChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  saveModification() {
    this.my_question.point = this.selectedpoint.point;
    this.my_question.time = this.selectedpoint.point;
    this.visible = false;
  }
}
