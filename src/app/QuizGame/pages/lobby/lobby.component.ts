import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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
  nOfParticipants: number = 0;
  url: string = '';
  isHost: boolean = false;
  userUid: any;
  isGameLaunch: any;

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
      this.initializeUrl();
      if (this.roomId != null) {
        this.initializeSocketListeners();
        this.fetchRoomInfo();
        this.listenToNewParticipants();
      }
    });

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
  }

  private initializeUrl(): void {
    this.url = `http://localhost:4200/quiz-game/join-game?roomId=${this.roomId}`;
  }

  private initializeSocketListeners(): void {
    if (this.roomId) {
      this.socketService.listenToGameStarted(this.roomId);
    }
    this.socketService.listenToHostLeaveGame();
  }

  private fetchRoomInfo(): void {
    if (this.roomId) {
      this.socketService.getRoomInfo(this.roomId).subscribe((info: any) => {
        this.roomInfo = info;
        this.nOfParticipants = this.roomInfo.clients.length;

        this.socketService.getUserInfos().subscribe((value) => {
          this.userUid = value;
          this.isHost = this.userUid.uid == this.roomInfo.game.host;
          this.isGameLaunch = this.roomInfo.game.isLaunch;
          this.cdr.detectChanges();

          if (this.isGameLaunch) {
            this._router.navigate(['quiz-game/game', this.roomId]);
          }
        });
      });
    }
  }

  private listenToNewParticipants(): void {
    if (this.roomId) {
      this.socketService.newUserInLobby(this.roomId).subscribe((newParticipant: any) => {
        console.log('New user joined:', newParticipant);
        this.fetchRoomInfo();
      });
    }
  }

  startGame(): void {
    if (this.roomId) {
      this.socketService.startGame(this.roomId);
    }
  }

  leaveGame(): void {
    if (this.roomId) {
      this.socketService.leaveGame(this.roomId, this.userUid.uid);
    }
  }
}
