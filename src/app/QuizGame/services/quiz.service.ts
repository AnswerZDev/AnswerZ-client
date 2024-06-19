import {Injectable} from "@angular/core";
import {QuizApi} from "src/app/core/http/quiz/quiz.api";
import {Quiz} from "src/app/core/models/api/quiz";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(
        private readonly _quizApi: QuizApi,
    ) {
    }

    private _quiz: Quiz | undefined;

    public get quiz() {
        return this._quiz;
    }

    private _quiz_list: Quiz[] | undefined;

    public get quiz_list() {
        return this._quiz_list;
    }

    initQuizById(quizId: string): Subject<Quiz> {
        let subject = new Subject<Quiz>();
        this._quizApi.getQuizById(quizId).subscribe({
            next: (quiz: Quiz) => {
                this._quiz = quiz as Quiz;
                subject.next(quiz);
            },
            error: (error) => {
            }
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
            error: (error) => {
            }
        });
        return subject;
    }

    getAllPublicQuizByUser(): void {
        this._quizApi.getAllPublicQuizFromUser().subscribe({
            next: (quiz: any) => {
                this._quiz_list = quiz.member as Quiz[];
            },
            error: (error) => {
            }
        });
    }

    getAllPrivateQuizByUser(): void {
        this._quizApi.getAllPrivateQuizFromUser().subscribe({
            next: (quiz: any) => {
                this._quiz_list = quiz.member as Quiz[];
            },
            error: (error) => {
            }
        });
    }

    updateQuiz(idQuiz: string, data: any) {
        this._quizApi.update(idQuiz, data).subscribe({
            next: (quiz: any) => {
                this._quiz = quiz as Quiz;
            },
            error: (error) => {
            }
        });
    }

    private uploadImage(file: File | null, idQuiz: string): void {
        if (!file) return;

        let formData = new FormData();

        formData.append('quizPicture', file);

        this._quizApi.uploadImage(idQuiz, formData).subscribe({
            next: (response) => {
            },
            error: (error) => {
            }
        });
    }

    deleteQuiz(quizId : string): void {
        this._quizApi.deleteQuizById(quizId).subscribe({
            next: () => {
                this._quizApi.deleteQuizById(quizId).subscribe();
            },
            error: (error) => { }
        });
    }

}