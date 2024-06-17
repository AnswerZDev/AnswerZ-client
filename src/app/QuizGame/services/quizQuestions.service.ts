import { Injectable } from "@angular/core";
import { Question } from "src/app/core/models/api/question";

@Injectable({
    providedIn: 'root',
})
export class QuizQuestionsService{
    private questions: Question[] = [];

    constructor(){
    }

    getAll(): Question[]{
        return this.questions;
    }

    addQuestion(question: Question){
        this.questions.push(question);
    }

    removeQuestion(id: number){
        
    }
}