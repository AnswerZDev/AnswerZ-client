import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket: Socket;

  constructor(
    private readonly _router: Router
  ) {
    this._socket = io('http://localhost:3000');
  }

  getCurrentSocketId(){
    return this._socket.id;
  }

  createRoom() {
    this._socket.emit('create-game', this._socket.id);
    this._socket.off('roomCreated');
    this._socket.once('roomCreated', (roomId: string) => {
      this._router.navigate(['quiz-game/quizz-lobby', roomId]);
    });
  }

  joinRoom(roomId : string) {
    this._socket.emit('join-game', roomId);
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
}
