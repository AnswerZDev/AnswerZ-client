import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserApi } from '../http/user/user.api';
import { SocketApi } from '../http/socket/socket.api';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket: Socket;
  private userInfos : any;

  constructor(
    private readonly _router: Router,
    private readonly _socketApi: SocketApi
  ) {
    this._socket = io('http://localhost:3100');
    this.getUserInfos().subscribe((value) => {
      this.userInfos = value;
    });
  }


  getCurrentSocketId(){
    return this._socket.id;
  }

  getUserInfos(){
    return this._socketApi.getUserInfos();
  }

  createRoom() {

      this._socket.emit('create-game', this._socket.id, this.userInfos);
      this._socket.off('roomCreated');
      this._socket.once('roomCreated', (roomId: string) => {
        this._router.navigate(['quiz-game/quizz-lobby', roomId]);
      });
  }

  joinRoom(roomId : string) {
    this._socket.emit('join-game', roomId, this.userInfos);
    this._socket.off('joined-game');
    this._socket.once('joined-game', (roomId: string) => {
      this._router.navigate(['quiz-game/quizz-lobby', roomId]);
    });
  }

  newUserInLobby(roomId: string): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('userJoined', (data: { roomId: string, clientId: string }) => {
        observer.next(data);
      });
    });
  }

  getRoomInfo(roomId: string): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.off('roomInfo');
      this._socket.on('roomInfo', (info: any) => {
        observer.next(info);
      });
      this._socket.emit('getRoomInfo', roomId);
    });
  }

  startGame(roomId: string){
    this._socket.emit('start-game', roomId);
  }

  sendMessage(roomId: string, message: string) {
    this._socket.emit("answer", { message, roomId });
  }

  listenToGameStarted(roomId : string){
    this._socket.off('game-started');
    this._socket.once('game-started', () => {
      this._router.navigate(['quiz-game/game', roomId]);
    });
  }

  listenToHostLeaveGame(){
    this._socket.off('host-leave');
    this._socket.once('host-leave', () => {
      this._router.navigate(['quiz-game/join-game']);
    });
  }

  leaveGame(roomId : string, isHost: boolean){
    this._socket.emit('leave-game', roomId, isHost);
  }
}
