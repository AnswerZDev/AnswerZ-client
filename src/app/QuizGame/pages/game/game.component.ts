import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  roomId: string | null | undefined;
  private questionSubject = new BehaviorSubject<any>(null);
  question$: Observable<any> = this.questionSubject.asObservable();

  constructor(private router: Router, private socketService: SocketService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');

    });
  }

  ngOnInit(): void {
    if (this.roomId) {
      this.socketService.askQuestion(this.roomId);
      
      this.socketService.listenToQuestion().subscribe((question: any) => {
        console.log('New question:', question);
        this.questionSubject.next(question);
      });
    }
  }
  
}
