import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-all-flashcards-set',
  templateUrl: './all-flashcards-set.component.html',
  styleUrls: ['./all-flashcards-set.component.scss']
})
export class AllFlashcardsSetComponent implements OnInit{

  modesVisibilite: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined;

  ngOnInit() {
    this.modesVisibilite = [
        { name: 'Public' },
        { name: 'Private' },
    ];
  }

  constructor(private readonly router: Router){

  }

  onRedirigeToPageCreateFlashcardSet() {
     this.router.navigateByUrl('/flashcards/create-flashcard');
  }

}
