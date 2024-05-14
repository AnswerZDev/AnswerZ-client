import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  roomInfo: any;
    roomId: string | null | undefined;

  constructor(private route: ActivatedRoute, private socketService: SocketService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
      if(this.roomId != null){
        this.socketService.getRoomInfo(this.roomId).subscribe((info: any) => {
            this.roomInfo = info;
            console.log(this.roomInfo);
          });
      }
    });
  }
}
