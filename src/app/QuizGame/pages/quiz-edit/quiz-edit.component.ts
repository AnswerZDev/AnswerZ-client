import { Component } from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Router } from '@angular/router';
import {QuizQuestionsService} from "../../services/quizQuestions.service";
import {VisibilityTypeEnum} from "../../dto/VisibilityType";


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

    public photoQuizz: string = "../../../../assets/images/audric.jpeg";

    modesVisibilite: Mode[] | undefined;
    numberPlayers: NumberPlayers[] | undefined;
    selectednumberPlayers: NumberPlayers  = {name: 1};
    numberQuestion: number = 1;

    protected VisibilityType = VisibilityTypeEnum;


    quizDescription: string = 'Test description';

    constructor(
        private readonly _router: Router,
        public readonly quizQuestionsService: QuizQuestionsService
    ) {}

    ngOnInit(): void {
        this.onInitModeVisibility();
        this.onInitNumberPlayers()
        this.quizQuestionsService.initQuestions();
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

    onPlay() {
        throw new Error('Method not implemented.');
    }

    addQuestion(): void {
        this._router.navigate(["/quiz-game/create-question"]);
    }

    public deleteQuestion(idQuestion: string): void {
        this.quizQuestionsService.removeQuestion(idQuestion);
    }

    public saveModification(): void {}

    public onVisibilityChange(event: any): void {}
}
