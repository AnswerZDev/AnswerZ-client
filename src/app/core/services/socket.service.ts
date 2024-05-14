import { Injectable } from '@angular/core';
import { Socket, io }  from 'socket.io-client';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

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

    createRoom(){
      this._socket.emit('create-game', this._socket.id);
      this._socket.on('roomCreated', (roomId: string) => {
        console.log(roomId);
        this._router.navigate(['quiz-game/quizz-lobby', roomId]);
      });
    }

    getRoomInfo(roomId: string): Observable<any> {
      return new Observable<any>(observer => {
        this._socket.on('roomInfo', (info: any) => {
          observer.next(info);
        });
        this._socket.emit('getRoomInfo', roomId);

      });
    }


    sendMessage(roomId: string, message: string){
      this._socket.emit("answer", {message, roomId});
    }



}