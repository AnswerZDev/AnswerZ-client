import { Injectable } from "@angular/core";
import { QuizApi } from "src/app/core/http/quiz/quiz.api";
import { Question } from "src/app/core/models/api/question";
import { Quiz } from "src/app/core/models/api/quiz";
import {QuestionApi} from "../../core/http/question/question.api";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private _quiz: Quiz | undefined;
    private _quiz_list: Quiz[] | undefined;


    public get quiz() {
        return this._quiz;
    }

    public get quiz_list() {
        return this._quiz_list;
    }

    constructor(
        private readonly _quizApi: QuizApi,
    ){}

    initQuizById(quizId : string): Subject<Quiz> {
        let subject = new Subject<Quiz>();
        this._quizApi.getQuizById(quizId).subscribe({
            next: (quiz: Quiz) => {
                this._quiz = quiz as Quiz;
                subject.next(quiz);
            },
            error: (error) => { }
        });
        return subject;
    }

    public createQuiz(data: any, file: File | null): Subject<string> {
        let subject = new Subject<string>();
        this._quizApi.create(data).subscribe({
            next: (quiz: any) => {
                subject.next(quiz.id);
                this.uploadImage(file, quiz.id);
            },
            error: (error) => { }
        });
        return subject;
    }

    private uploadImage(file: File | null, idQuiz: string): void {
        if(!file) return;

        let formData = new FormData();

        formData.append('quizPicture', file);

        this._quizApi.uploadImage(idQuiz, formData).subscribe({
            next: (response) => { },
            error: (error) => { }
        });
    }

    getAllPublicQuizByUser(): void {
        this._quizApi.getAllPublicQuizFromUser().subscribe({
            next: (quiz: any) => {
                this._quiz_list = quiz.member as Quiz[];
            },
            error: (error) => { }
        });
    }

    getAllPrivateQuizByUser(): void {
        this._quizApi.getAllPrivateQuizFromUser().subscribe({
            next: (quiz: any) => {
                this._quiz_list = quiz.member as Quiz[];
            },
            error: (error) => { }
        });
    }

}