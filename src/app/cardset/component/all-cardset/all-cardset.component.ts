import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardsetService } from '../../services/cardset.service';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-all-cardset',
  templateUrl: './all-cardset.component.html',
  styleUrls: ['./all-cardset.component.scss']
})
export class AllCardsetComponent implements OnInit{

  listCardset: any[] = [];

  categories: Mode[] | undefined;
  selectedCategories: Mode | undefined;
  value: any;
  selectedItems: any;
  items: any

  filterCountry() {
    //  console.log(this.selectedItems);
  }


  constructor(private cardsetservice: CardsetService){
  }

  ngDoCheck(): void {
    //console.log(this.selectedCategories);

    // Faire quelque chose lorsque l'utilisateur change de thématique
  }

  ngOnInit() {
    this.cardsetservice.getAllCardset().subscribe((data: any) => {
      this.listCardset = data;
    });

    this.categories = [
      { name: 'All' },
      { name: 'Physique' },
      { name: 'Mathématique' },
      { name: 'Chimie' },
      { name: 'Anglais' },
      { name: 'Histoire' },
      { name: 'Français' },
    ];
  }
  
}
