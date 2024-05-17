import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';




export interface Time{
    duration : number;
}

export interface Points{
    points: number;
}

export interface Type{
    type: string;
}

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss']
})


export class CreateQuestionComponent{
    
    public e_value = "";

    timeChoices : Time[] | undefined;

    pointsChoices : Points[] | undefined;

    typeChoices : Type[] | undefined;

    myChoice : Type | undefined;


    /**
     * @author @HugoooR
     * @date 14/05/2024
     * @description Create a question with the data
     * @memberof HomePage
     */
    createQuestion(): void {
        
    }


    ngOnInit() {
       
        this.timeChoices = [
          { duration: 5 },
          { duration: 10 },
          { duration: 15 },
          { duration: 20 },
          { duration: 25 },
          { duration: 30 },
          { duration: 45 },
          { duration: 60 },
          { duration: 90 },
          { duration: 120 },
        ];

        this.pointsChoices = [
            { points: 1 },
            { points: 2 },
            { points: 3 },
            { points: 4 },
            { points: 5 },
            { points: 10 },
        ];

        this.typeChoices = [
            { type: "True/False"},
            { type: "MCQ"},
        ];
    }
}