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

  imageInformation: string = '../../../../assets/images/information.svg';
  value: number = 0;

  isLikedMode: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modesVisibilite = [
      {name: 'Public'},
      {name: 'Private'}
    ];

    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
      }
    }, 2000);
  }

  redirectToCreateFlashcardSet() {
    this.router.navigate(['/cardset/create-flashcard-set']);
  }
}
