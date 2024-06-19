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
  stats: boolean = false;
  selectedQuestions : string[] = [];
  roomInfo: any;
  value: number = 30;

  totalTimeInSeconds: number = 30; // 30 secondes
  progressPercentage: number = 0;
  isClicked: boolean = false;
  endGame: boolean = false;
  statsPercentage: number = 0;
  globalAnswersStats: any | undefined;
  nbTotalAnswers: number = 0;
  questionNumber: number = 0;
  

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

    this.totalTimeInSeconds = 30;
    this.progressPercentage = 100;

    setInterval(() => {
      if (this.totalTimeInSeconds > 0) {
        this.totalTimeInSeconds--;
      } else {
        this.totalTimeInSeconds = 35;
      }
      this.progressPercentage = (this.totalTimeInSeconds / 30) * 100;
    }, 1000);
    
    if (this.roomId) {
       this.socketService.askQuestion(this.roomId)

      this.socketService.listenToGameEnded().subscribe(() => {
        this.endGame = true;
        this.stats = false;
        console.log('game ended')
      });

      this.socketService.listenToQuestion().subscribe((question: any) => {
        this.stats = false;
        this.questionNumber = question.questionNumber;
        this.questionSubject.next(question);
      });

      this.socketService.listenToStats().subscribe((answers) => {
        this.globalAnswersStats = answers;
        this.stats = true;
        console.log(this.stats);
      });

      
      this.socketService.giveAnswers(this.roomId).subscribe(() => {
        const currentQuestion = this.questionSubject.getValue();
        if (this.roomId && currentQuestion) {
          this.socketService.sendAnswer(this.roomId, currentQuestion.question as string, this.selectedQuestions);
        }
      });
    }
  }


  selectAnswer(answer: string) {
    if (!this.selectedQuestions.includes(answer)) {
      this.selectedQuestions.push(answer);
    } else {
      this.selectedQuestions = this.selectedQuestions.filter(a => a !== answer);
    }
  }
}

