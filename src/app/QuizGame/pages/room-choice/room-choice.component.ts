import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-choice',
  templateUrl: './room-choice.component.html',
  styleUrls: ['./room-choice.component.scss']
})
export class RoomChoiceComponent{
    public roomForm: FormGroup = new FormGroup({
        roomId: new FormControl(null, Validators.required),
        messageId : new FormControl(null, Validators.required),
    })

    constructor(private socketService: SocketService) { }


    onSubmit() {
        if(this.roomForm.valid){
            this.socketService.addToRoom(this.roomForm.controls['roomId'].value);
        }
    }

    onSend() {
        if(this.roomForm.valid){
            this.socketService.sendMessage(this.roomForm.controls['roomId'].value,this.roomForm.controls['messageId'].value);
        }
    }
}