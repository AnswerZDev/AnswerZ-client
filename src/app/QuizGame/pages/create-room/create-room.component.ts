import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class createRoomComponent{
    public roomForm: FormGroup = new FormGroup({
        roomId: new FormControl(null, Validators.required),
        messageId : new FormControl(null, Validators.required),
    })

    constructor(private socketService: SocketService) { }

    onSubmit() {
        if(this.roomForm.valid){
            this.socketService.createRoom();
        }
    }

    onSend() {
        if(this.roomForm.valid){
            this.socketService.sendMessage(this.roomForm.controls['roomId'].value,this.roomForm.controls['messageId'].value);
        }
    }
}