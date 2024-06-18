import { Component } from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import {QuizQuestionsService} from "../../services/quizQuestions.service";
import {VisibilityTypeEnum} from "../../dto/VisibilityType";
import { Quiz } from 'src/app/core/models/api/quiz';
import { QuizService } from '../../services/quiz.service';


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
    selectednumberPlayers: number = this.quiz!.max_players as number;
    quizDescription: string = this.quiz?.description as string;
    photoQuizz: string = this.quiz?.image as string;


    protected VisibilityType = this.quiz?.visibility;

    constructor(
        private readonly _router: Router,
        public readonly quizQuestionsService: QuizQuestionsService,
        private readonly quizService: QuizService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.onInitModeVisibility();
        this.onInitNumberPlayers()
        this.quizQuestionsService.initQuestions();
        this.route.params.subscribe(params => {
            const quizId = params['quizId'];
            this.quizService.initQuizById(quizId);
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


    public get quiz(): Quiz | undefined {
        return this.quizService.quiz;
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

    onPlay() {
        this._router.navigate(["/quiz-game/join-game"]);
    }

    addQuestion(): void {
        this._router.navigate(["/quiz-game/create-question"]);
    }

    public deleteQuestion(idQuestion: string): void {
        this.quizQuestionsService.removeQuestion(idQuestion);
    }

    public saveModification(): void {}

    public onVisibilityChange(event: any): void {}

    public quitEdit(): void{
        this._router.navigate(["/quiz-game/my-quiz"]);
    }
}
