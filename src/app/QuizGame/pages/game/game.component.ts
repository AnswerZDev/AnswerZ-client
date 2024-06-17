import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/core/services/socket.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  roomId: string | null | undefined;
  private questionSubject = new BehaviorSubject<any>(null);
  question$: Observable<any> = this.questionSubject.asObservable();

  selectedQuestions = [
    '39-45',
    '13-16'
  ];

  roomInfo: any;

  constructor(private router: Router, private socketService: SocketService, private route: ActivatedRoute,  private fb: FormBuilder) {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');
    });

    if(this.roomId){
      this.socketService.getRoomInfo(this.roomId).subscribe((info: any) => {
        this.roomInfo = info;
      });
    }
  }

  ngOnInit(): void {
    
    if (this.roomId) {
       this.socketService.askQuestion(this.roomId)

      this.socketService.listenToQuestion().subscribe((question: any) => {
        this.questionSubject.next(question);
      });

      
    this.socketService.giveAnswers(this.roomId).subscribe(() => {
      const currentQuestion = this.questionSubject.getValue();
      if (this.roomId && currentQuestion) {
        console.log(JSON.stringify(currentQuestion.question))
        this.socketService.sendAnswer(this.roomId, currentQuestion.question as string, this.selectedQuestions);
      }
    });
    }
  }
}

