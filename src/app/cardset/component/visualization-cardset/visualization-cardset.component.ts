import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cardset } from 'src/app/core/models/api/cardset';
import { CardsetService } from '../../services/cardset.service';

@Component({
  selector: 'app-visualization-cardset',
  templateUrl: './visualization-cardset.component.html',
  styleUrls: ['./visualization-cardset.component.scss']
})
export class VisualizationCardsetComponent {
  @Input() my_cardset!: Cardset; 

  constructor(
    private router: Router,
    private readonly cardsetservice: CardsetService) {
  }

  onRedirigeToPagePlay() {
    this.cardsetservice.setcardsetPlay(this.my_cardset);
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
