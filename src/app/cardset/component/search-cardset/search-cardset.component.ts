import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search-cardset',
  templateUrl: './search-cardset.component.html',
  styleUrls: ['./search-cardset.component.scss']
})
export class SearchCardsetComponent {

  constructor(private router: Router) {
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
