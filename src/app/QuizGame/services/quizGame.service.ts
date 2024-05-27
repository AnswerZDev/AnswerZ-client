import { Injectable } from "@angular/core";
import { QuestionQuiz } from "../pages/quiz-edit/quiz-edit.component";

interface QuizGame{
    idUser: number;
    name: string;
    nbPlayers: number;
    question: QuestionQuiz[];
}

@Injectable({
    providedIn: 'root',
})
export class QuisGameService{

    private _quizgame: QuizGame[] | undefined;

    get quizgame(): QuizGame[] | undefined {
        return this._quizgame;
    }

    public getQuizGameByUser(id: number) {
        this._quizgame = [
         {
            idUser: 1,
            name: "English quiz",
            nbPlayers: 10,
            question: [
                {   
                    question: "qui est le plus beau",
                    reponse: ["romain", "audric", "hugo", "théo"],
                    type: true,
                    point: 100,
                    time: 5,
                },
                {   
                    question: "Who is carreau",
                    reponse: ["informaticien", "puceau"],
                    type: false,
                    point: 100,
                    time: 5,
                },
                {   
                    question: "La plus belle voiture ?",
                    reponse: ["e36", "e46", "e30", "e24"],
                    type: true,
                    point: 100,
                    time: 5,
                } 
            ]
         },
         {
            idUser: 1,
            name: "Mathématique quiz",
            nbPlayers: 15,
            question: [
                {   
                    question: "Quelle fusion a donné naissance à Stellantis ?",
                    reponse: ["BMW avec Mercedes", "Groupe PSA avec FCA", "Citroën avec Fiat", 
                    "Seat avec Bentley"],
                    type: true,
                    point: 100,
                    time: 5,
                }
            ]
         }
        ];

        console.log(this._quizgame);
    }
}