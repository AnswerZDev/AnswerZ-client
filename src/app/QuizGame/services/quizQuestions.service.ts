import { Injectable } from "@angular/core";
import { QuizApi } from "src/app/core/http/quiz/quiz.api";
import { Question } from "src/app/core/models/api/question";
import { Quiz } from "src/app/core/models/api/quiz";

@Injectable({
    providedIn: 'root',
})
export class QuizQuestionsService{
    private questions: Question[] = [];

    constructor(
        private readonly _quizApi: QuizApi
    ){
    }

    getAll(): Question[]{
        return this.questions;
    }

    addQuestion(question: Question){
        this.questions.push(question);
    }

    removeQuestion(id: number){
        
    }

    public createQuiz(data: Quiz): void {
        this._quizApi.create(data).subscribe({
            next: (data) => { },
            error: (error) => { }
        });
        
        // this._quizApi.uploadImage(1, data.image).subscribe({
        //     next: (response) => { },
        //     error: (error) => { }
        // });
    }
}