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

    // load all cardset public
    this.cardsetservice.getAllCardset();
   
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

  // Search cardset which match with the search of the User 
  // Add to temporary list 
  search($event: AutoCompleteCompleteEvent) {
    console.log(this.filteredCardsets);

    this.filteredCardsets = this.cardsetservice.cardsets.filter(cardset =>
      cardset.name && cardset.name.toLowerCase().includes(this.selectedItems.toLowerCase())
    );

    this.useFilteredCardsets = true;

  }

  // When the user stop to search (search bar empty)
  onClear() {
    this.useFilteredCardsets = false;
  }

  // When the user change the category with the button (top on the right)
  // display cardset with the categorie selected by the user
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

  // return true if a category exist in cardset list
  hasCardsetsOfType(arg0: string): boolean {
    return this.cardsetservice.cardsets.some(cardset => cardset.category === arg0);
  }

  // return true if a category exist in filteredCardsets list only if filtered list
  // is not empty, false otherwise
  hasCardsetsOfTypeFiltered(arg0: string): boolean {
    if(this.useFilteredCardsets){
      return this.filteredCardsets.some(cardset => cardset.category === arg0); 
    }
    else return true;
  }
}
