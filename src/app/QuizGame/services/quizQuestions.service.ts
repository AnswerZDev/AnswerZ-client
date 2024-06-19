import { Injectable } from "@angular/core";
import { QuizApi } from "src/app/core/http/quiz/quiz.api";
import { Question } from "src/app/core/models/api/question";
import { Quiz } from "src/app/core/models/api/quiz";
import {QuestionApi} from "../../core/http/question/question.api";
import {QuizService} from "./quiz.service";

@Injectable({
    providedIn: 'root',
})
export class QuizQuestionsService {

    constructor(
        private readonly _questionApi: QuestionApi,
        private readonly _quizService: QuizService
    ){}

    addQuestion(question: any, idQuiz: string): void {
        this._questionApi.create(question, idQuiz).subscribe({
            next: () => {
                this._quizService.initQuizById(idQuiz).subscribe();
            },
            error: (error) => { }
        });
    }

    removeQuestion(idQuestion: string, idQuiz: string): void {
        this._questionApi.remove(idQuestion).subscribe({
            next: () => {
                this._quizService.initQuizById(idQuiz).subscribe();
            },
            error: (error) => { }
        });
    }
}