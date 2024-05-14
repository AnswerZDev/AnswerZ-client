import { Component } from '@angular/core';
import { Cardset } from 'src/app/core/models/api/cardset';
import { CardsetService } from '../../services/cardset.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-all-cardset',
  templateUrl: './all-cardset.component.html',
  styleUrls: ['./all-cardset.component.scss']
})
export class AllCardsetComponent {
  categories!: Mode[];
  categories_filtered! : Mode[];
  selectedCategories: Mode | undefined;
  value: any;
  selectedItems: any;
  items: any
  suggestions: any;

  filteredCardsets: Cardset[] = [];
  useFilteredCardsets: boolean = false;

  constructor(public readonly cardsetservice: CardsetService){
  }

  async ngOnInit() {

    // this.cardsetservice.getAllCardset();
    this.cardsetservice.getAllCardset();
    // this.cardsetservice.cardsets.forEach(
    //   element => this.filteredCardsets.push(element)
    // );

    // this.cardsetservice.cardsets.forEach(
    //   cardset => console.log(cardset)
    // );
   
    this.categories = [
      { name: 'Categories' },
      { name: 'Physique' },
      { name: 'Mathematique' },
      { name: 'Chimie' },
      { name: 'Anglais' },
      { name: 'Histoire' },
      { name: 'Français' },
      { name: 'Informatique' },
    ];

    this.categories_filtered = [
      { name: 'Categories' },
      { name: 'Physique' },
      { name: 'Mathematique' },
      { name: 'Chimie' },
      { name: 'Anglais' },
      { name: 'Histoire' },
      { name: 'Français' },
      { name: 'Informatique' },
    ];


  }

  search($event: AutoCompleteCompleteEvent) {
    console.log(this.filteredCardsets);

    this.filteredCardsets = this.cardsetservice.cardsets.filter(cardset =>
      cardset.name && cardset.name.toLowerCase().includes(this.selectedItems.toLowerCase())
    );

    this.useFilteredCardsets = true;

  }

  onClear() {
    this.useFilteredCardsets = false;
  }

  onCategoryChange($event: any) {
    if(this.selectedCategories && this.selectedCategories?.name !== "Categories"){
      this.categories_filtered = [
        { name: this.selectedCategories?.name }
      ]
    } else {
      this.categories_filtered = [
        { name: 'Categories' },
        { name: 'Physique' },
        { name: 'Mathematique' },
        { name: 'Chimie' },
        { name: 'Anglais' },
        { name: 'Histoire' },
        { name: 'Français' },
        { name: 'Informatique' },
      ]
    }
  }

  hasCardsetsOfType(arg0: string): boolean {
    return this.cardsetservice.cardsets.some(cardset => cardset.category === arg0);
  }

  hasCardsetsOfTypeFiltered(arg0: string): boolean {
    if(this.useFilteredCardsets){
      return this.filteredCardsets.some(cardset => cardset.category === arg0); 
    }
    else return true;
  }
}
