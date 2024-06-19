import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.scss']
})
export class QuizAnswerComponent implements OnInit{
  @Input() answer!: Observable<any>;

  isAnswerSelected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  selectAnswerz() {
    this.isAnswerSelected = !this.isAnswerSelected;
  }
}
