import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.scss']
})
export class QuizAnswerComponent implements OnInit{

  isAnswerSelected: boolean = false;

  constructor() {}

  ngOnInit(): void {

  }

  selectAnswerz() {
    this.isAnswerSelected = !this.isAnswerSelected;
  }
}
