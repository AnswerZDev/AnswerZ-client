import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stats-game',
  templateUrl: './stats-game.component.html',
  styleUrls: ['./stats-game.component.scss']
})
export class StatsGameComponent {
  @Input() statsPercentage: number = 0;
  @Input() answers: any;
  @Input() index: number = 0;

  answerKeys(): string[] {
    if (this.answers) {
      return Object.keys(this.answers.answers);
    }
    return [];
  }
}
