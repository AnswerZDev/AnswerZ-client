import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Question} from 'src/app/core/models/api/question';


export interface Time {
    time: number;
}

export interface Point {
    point: number;
}


@Component({
    selector: 'app-visualization-question-quiz',
    templateUrl: './visualization-question-quiz.component.html',
    styleUrls: ['./visualization-question-quiz.component.scss']
})
export class VisualizationQuestionQuizComponent {

    times: Time[] = [];
    points: Point[] = [];

    @Input() my_question!: Question;

    @Output() public onDeleteQuestionEvent: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit() {
        this.onInitTime();
        this.onInitPoints();
    }

    private onInitPoints(): void {
        this.points = [
            {point: 100},
            {point: 200},
            {point: 300},
            {point: 400},
            {point: 500},
            {point: 600},
            {point: 700},
            {point: 800},
            {point: 900},
            {point: 100},
        ];
    }

    private onInitTime(): void {
        this.times = [
            {time: 5},
            {time: 10},
            {time: 11},
            {time: 12},
            {time: 13},
            {time: 14},
            {time: 15},
            {time: 20},
        ];
    }

    public onDeleteQuestion(): void {
        this.onDeleteQuestionEvent.emit(this.my_question.id);
    }
}
