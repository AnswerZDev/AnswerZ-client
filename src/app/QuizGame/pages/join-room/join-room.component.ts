import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importer ActivatedRoute
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
    public roomForm!: FormGroup;

    constructor(private socketService: SocketService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.roomForm = new FormGroup({
            roomId: new FormControl(this.getRoomIdFromUrl(), Validators.required)
        });
    }

    getRoomIdFromUrl(): string {
        return this.route.snapshot.queryParams['roomId']
    }

    onSubmit() {
        console.log('test')
        this.socketService.joinRoom(this.roomForm.controls['roomId'].value);
    }
}
