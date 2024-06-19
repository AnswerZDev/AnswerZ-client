import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from 'src/app/core/models/api/quiz';
import {Mode} from '../quiz-edit/quiz-edit.component';

@Component({
    selector: 'app-my-quiz-visualization',
    templateUrl: './my-quiz-visualization.component.html',
    styleUrls: ['./my-quiz-visualization.component.scss']
})
export class MyQuizVisualizationComponent implements OnInit {

    selectedModeVisibilities: Mode = {name: 'Private'};
    modesVisibilite: Mode[] | undefined;


    constructor(
        private readonly _router: Router,
        private readonly _quizService: QuizService,
        private readonly _route: ActivatedRoute
    ) {
    }

    private onInitListQuiz(visibilty: string): void {
        console.log(visibilty);
        if (visibilty === 'Public') {
            this._quizService.getAllPublicQuizByUser();
        } else {
            this._quizService.getAllPrivateQuizByUser();
        }
    }

    public get quiz_list(): Quiz[] {
        if(!this._quizService.quiz_list) return [];
        return this._quizService.quiz_list;
    }

    ngOnInit(): void {
        this.initVisibility();
        this.onInitListQuiz(this.selectedModeVisibilities.name);
    }

    public createQuiz() {
        this._router.navigate(["/quiz-game/create-quiz"]);
    }


    onVisibilityChange(event: any) {
        this.onInitListQuiz(event.value['name']);
    }

    private initVisibility(): void {
        this.modesVisibilite = [
            {name: 'Private'},
            {name: 'Public'}
        ];
    }

    public editQuiz(idQuiz: string) {
        this._router.navigate(["/quiz-game/quiz-edit/" + idQuiz]);
    }

}
