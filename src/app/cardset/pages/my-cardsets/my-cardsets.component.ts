import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-my-cardsets',
  templateUrl: './my-cardsets.component.html',
  styleUrls: ['./my-cardsets.component.scss']
})
export class MyCardsetsComponent implements OnInit {
  modesVisibilite: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modesVisibilite = [
      {name: 'Public'},
      {name: 'Private'}
    ];
  }

  redirectToCreateFlashcardSet() {
    this.router.navigate(['/cardset/create-flashcard-set']);
  }
}
