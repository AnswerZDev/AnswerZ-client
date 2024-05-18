import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class joinRoomComponent{
    public roomForm: FormGroup = new FormGroup({
        roomId: new FormControl(null, Validators.required)
    })

    constructor(private socketService: SocketService) { }

    onSubmit() {
        console.log('test')
        this.socketService.joinRoom(this.roomForm.controls['roomId'].value);
    }
}