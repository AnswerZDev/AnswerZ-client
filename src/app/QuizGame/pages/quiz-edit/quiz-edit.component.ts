import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizQuestionsService} from "../../services/quizQuestions.service";
import {VisibilityTypeEnum} from "../../dto/VisibilityType";
import {Quiz} from 'src/app/core/models/api/quiz';
import {QuizService} from '../../services/quiz.service';


export interface Mode {
    name: string;
}

export interface NumberPlayers {
    name: number;
}

export interface QuestionQuiz {
    question: string;
    reponse: string[];
    type: boolean;
    point: number;
    time: number;
}

@Component({
    selector: 'app-quiz-edit',
    templateUrl: './quiz-edit.component.html',
    styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent {

    modesVisibilite: Mode[] | undefined;
    numberPlayers: NumberPlayers[] | undefined;
    selectednumberPlayers: number = this.quiz?.max_players as number;
    quizDescription: string = this.quiz?.description as string;
    photoQuizz: string = this.quiz?.image as string;

    protected visibilityType: Mode | undefined;

    constructor(
        private readonly _router: Router,
        public readonly quizQuestionsService: QuizQuestionsService,
        private readonly _quizService: QuizService,
        private readonly route: ActivatedRoute
    ) {
    }

    public get quiz(): Quiz | undefined {
        return this._quizService.quiz;
    }

    ngOnInit(): void {
        this.onInitModeVisibility();
        this.onInitNumberPlayers();
        this.initQuiz();
    }

    onPlay() {
        this._router.navigate(["/quiz-game/join-game"]);
    }

    addQuestion(): void {
        this._router.navigate(["/quiz-game/create-question/quiz/" + this.quiz?.id]);
    }

    public deleteQuestion(idQuestion: string): void {
        this.quizQuestionsService.removeQuestion(idQuestion, this.quiz?.id as string);
    }

    public saveModification(): void {
        this._quizService.updateQuiz(
            this.quiz?.id as string,
            {
                maxPlayers: this.selectednumberPlayers,
                visibility: this.visibilityType?.name,
            }
        );

    }

    public deleteQuiz(): void {
        this._quizService.deleteQuiz(this.quiz?.id as string)
        this._router.navigate(["/quiz-game/my-quiz"]);
    }

    public onVisibilityChange(event: any): void {
    }

    public quitEdit(): void {
        this._router.navigate(["/quiz-game/my-quiz"]);
    }

    private initQuiz(): void {
        this.route.params.subscribe(params => {
            const quizId = params['quizId'];
            this._quizService.initQuizById(quizId).subscribe({
                next: (quiz: Quiz) => {
                    let mode: Mode = {name: quiz.visibility!};
                    this.selectednumberPlayers = quiz.max_players as number;
                    this.quizDescription = quiz.description as string;
                    this.visibilityType = mode;
                }
            });
        });
    }

    /**
     * Init mode visibility dropdown
     */
    private onInitModeVisibility(): void {
        this.modesVisibilite = [
            {name: VisibilityTypeEnum.PUBLIC},
            {name: VisibilityTypeEnum.PRIVATE}
        ];
    }

    private onInitNumberPlayers(): void {
        this.numberPlayers = [
            {name: 1},
            {name: 2},
            {name: 3},
            {name: 4},
            {name: 5},
            {name: 6},
            {name: 7},
            {name: 8},
            {name: 9},
            {name: 10}
        ];
    }
}
