import { Injectable } from '@angular/core';
import { Socket, io }  from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private _socket: Socket;

    constructor() {
      this._socket = io('http://localhost:3000');
    }

    addToRoom(roomId: string){
        this._socket.emit('WantAddToRoom', roomId);
    }

    sendMessage(roomId: string, message: string){
      this._socket.emit("answer", {message, roomId});
    }

}