import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent {
  @Input() roomInfo: any;

  constructor() { }
}
