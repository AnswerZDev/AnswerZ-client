import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  roomInfo: any | undefined;
  roomId: string | null | undefined;
  isFliped: boolean = false;
  direction: 'left' | 'right' = 'right';
  nOfParticipants : number = 0;
  url: string = '';
  isHost : boolean = false;
  userUid: any;

  constructor(private route: ActivatedRoute, private router: Router, private socketService: SocketService) {
    
  }



  flip_flashcard() {
    const flashcard = document.getElementById('flipContainer');

    if (flashcard) {
      flashcard.classList.remove('flipleft', 'flipright');

      void flashcard.offsetWidth;

      if (this.direction === 'right') {
        flashcard.classList.add('flipright');
      } else {
        flashcard.classList.add('flipleft');
      }

      this.direction = this.direction === 'right' ? 'left' : 'right';

      this.isFliped = !this.isFliped;
    }
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // TODO : REWORK QR CODE FUNCTIONS
      // THIS IS JUST A QUICK POC
      this.roomId = params.get('roomId');
      this.url = "http://localhost:4200/quiz-game/join-game";
      this.url += "?roomId=";
      this.url += this.roomId;


      if(this.roomId != null){
        this.socketService.listenToGameStarted(this.roomId);

        this.socketService.getRoomInfo(this.roomId).subscribe((info: any) => {
          this.roomInfo = info;
  
          this.nOfParticipants = this.roomInfo.clients.length;

          this.socketService.getUserInfos().subscribe((value) => {
            this.userUid = value;
            this.isHost = this.userUid.uid == this.roomInfo.game.host;

            console.log(this.isHost)
          });
      });



      

        this.socketService.newUserInLobby(this.roomId).subscribe((newParticipant: any) => {
            console.log('New user joined:', newParticipant);
            this.socketService.getRoomInfo(this.roomId!).subscribe((info: any) => {
                this.roomInfo = info;
                console.log(this.roomInfo);
            });
        });

        this.socketService.listenToHostLeaveGame();
      }
    });
  }


  startGame(){
    if(this.roomId){
      this.socketService.startGame(this.roomId);
    }
  }

  leaveGame(){
    if(this.roomId){
      this.socketService.leaveGame(this.roomId, this.userUid.uid);
    }
  }
}


