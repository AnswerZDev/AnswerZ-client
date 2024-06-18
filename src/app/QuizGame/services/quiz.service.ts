import { Injectable } from "@angular/core";
import { QuizApi } from "src/app/core/http/quiz/quiz.api";
import { Question } from "src/app/core/models/api/question";
import { Quiz } from "src/app/core/models/api/quiz";
import {QuestionApi} from "../../core/http/question/question.api";

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private _quiz: Quiz | undefined;

    public get quiz() {
        return this._quiz;
    }

    constructor(
        private readonly _quizApi: QuizApi,
        private readonly _questionApi: QuestionApi,
    ){}

    initQuizById(quizId : string){
        this._quizApi.getQuizById(quizId).subscribe({
            next: (quiz: Quiz) => {
                this._quiz = quiz as Quiz;
            },
            error: (error) => { }
        });
    }
}