import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit{

  totalTimeInSeconds: number = 30; // 30 secondes
  progressPercentage: number = 0;
  isClicked: boolean = false;
  responses: any[] = [];

  constructor() {}

  ngOnInit() {
    this.progressPercentage = 100;
    setInterval(() => {
      if (this.totalTimeInSeconds > 0) {
        this.totalTimeInSeconds--;
        this.progressPercentage = (this.totalTimeInSeconds / 30) * 100; // Mettez à jour la barre de progression en fonction du temps restant
      }
    }, 1000);
  }
}
