import { Component } from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface Mode {
  name: string;
}

export interface NumberPlayers {
  name: string;
}

export interface QuestionQuiz {
  question : string;
  reponse: string[];
}

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent {

  public photoQuizz: string = "../../../../assets/images/carreau.jpeg";

  modesVisibilite: Mode[]|undefined;
  selectedModeVisibilities: Mode | undefined = { name: 'Private' };
  numberPlayers: NumberPlayers[]|undefined;
  selectednumberPlayers: NumberPlayers | undefined = { name : '1 players' };
  numberQuestion: number = 1;

  listeQuestion: QuestionQuiz[] = [
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
    {   
      question: "qui est le plus beau",
      reponse: ["romain", "test"]
    },
 ];

  ngOnInit(): void {

    this.modesVisibilite = [
      { name: 'Public' },
      { name: 'Private' }
    ];

    this.numberPlayers = [
      { name: '1 players' },
      { name: '2 players' },
      { name: '3 players' },
      { name: '4 players' },
      { name: '5 players' },
      { name: '6 players' },
      { name: '7 players' },
      { name: '8 players' },
      { name: '9 players' },
      { name: '10 players' },
      { name: '11 players' },
      { name: '12 players' },
      { name: '13 players' },
      { name: '14 players' },
      { name: '15 players' },
    ];
  }

  saveModificaton() {
    throw new Error('Method not implemented.');
  }

  onVisibilityChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  onNumberPlayersChange($event: DropdownChangeEvent) {
    throw new Error('Method not implemented.');
  }

  onPlay() {
    throw new Error('Method not implemented.');
  }
    
}
