import { Injectable } from "@angular/core";
import { QuizApi } from "src/app/core/http/quiz/quiz.api";
import { Question } from "src/app/core/models/api/question";
import { Quiz } from "src/app/core/models/api/quiz";
import {QuestionApi} from "../../core/http/question/question.api";

@Injectable({
    providedIn: 'root',
})
export class QuizQuestionsService {
    private _questions: Question[] = [];

    public get questions(): Question[] {
        return this._questions;
    }

    constructor(
        private readonly _quizApi: QuizApi,
        private readonly _questionApi: QuestionApi,
    ){}

    public initQuestions(): void {
        this._questionApi.collection().subscribe({
            next: (questions: any) => {
                this._questions = questions.member as Question[];
            },
            error: (error) => {
            }
        });
    }

    addQuestion(question: any){
        this._questionApi.create(question).subscribe({
            next: (question: Question) => {
                this._questions.push(question);
            },
            error: (error) => { }
        });
    }

    removeQuestion(idQuestion: string) {
        this._questionApi.remove(idQuestion).subscribe({
            next: () => {
                this._questions = this._questions.filter(question => question.id !== idQuestion);
            },
            error: (error) => {
            }
        });
    }
}