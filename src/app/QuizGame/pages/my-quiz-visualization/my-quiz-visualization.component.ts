import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-quiz-visualization',
  templateUrl: './my-quiz-visualization.component.html',
  styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent {

  modesVisibilite: any[]|undefined;
  selectedModeVisibilities: any;

  constructor(
    private router: Router,
  ){

  }

}
