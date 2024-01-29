import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cardset } from 'src/app/core/models/api/cardset';

@Component({
  selector: 'app-search-cardset',
  templateUrl: './search-cardset.component.html',
  styleUrls: ['./search-cardset.component.scss']
})
export class SearchCardsetComponent {
  @Input() my_cardset!:Cardset; 

  constructor(private router: Router) {
    console.log(this.my_cardset)
  }

  onRedirigeToPagePlay() {
    this.router.navigateByUrl('/');
  }

  onHideDialog() {
    this.visible = false;
  }

  visible: boolean = false;
  picture: String = '../../../../assets/images/English_Student.png';

  showDialog() {
      this.visible = true;
  }
  
}
