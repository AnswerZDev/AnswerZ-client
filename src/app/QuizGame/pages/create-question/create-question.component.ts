import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/core/models/api/question';
import { MessageService } from 'primeng/api';
import { QuizQuestionsService } from '../../services/quizQuestions.service';




export interface Time{
    duration : number;
}

export interface Points{
    points: number;
}

export interface Type{
    type: string;
}

export interface NumberOfQuestions{
    number: number;
}

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss']
})


export class CreateQuestionComponent{
    
    e_value : String =  "";

    input_question : String = "";

    false_value : String = "False";

    true_value : String = "True";

    list_answers : String [] = [];

    timeChoices : Time[] | undefined;

    pointsChoices : Points[] | undefined;

    typeChoices : Type[] | undefined;

    NOQChoices : NumberOfQuestions[] | undefined;

    myChoice : Type | undefined;

    myPoints : Points | undefined;

    myTime : Time | undefined;

    myNOQ : NumberOfQuestions | undefined;

    @Output() questionCreated = new EventEmitter<Question>();

    /*
    public questionForm: FormGroup = new FormGroup({
        myTime: new FormControl(null, Validators.required),
        myChoice: new FormControl(null, Validators.required),
        myPoints: new FormControl(null, Validators.required),
        myNOQ: new FormControl(null, Validators.required),
        input_question: new FormControl(null, Validators.required),
    })
    */

    constructor(
        private readonly messageService: MessageService,
        private readonly questionsService: QuizQuestionsService
    ) { }

    /**
     * @author @HugoooR
     * @date 14/05/2024
     * @description Create a question with the data
     * @memberof CreateQuestionComponent
     */
    createQuestion(): void {
        /*
        if (this.questionForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }
        */
        
        // Vérifiez les champs communs
        if (!this.myTime || !this.myChoice || !this.myPoints || !this.input_question) {
            console.error('Tous les champs obligatoires doivent être remplis.');
            return;
        }

        // Vérifiez list_answers seulement si le type est "MCQ"
        if (this.myChoice.type === 'MCQ' && (!this.list_answers || this.list_answers.length === 0)) {
            console.error('Pour les questions à choix multiples, vous devez fournir des réponses.');
            return;
        }

        if(this.list_answers.length === 0){
            this.list_answers = ["True", "False"]
        }

        //let ques = new Question([this.input_question,this.myTime.duration,this.myPoints.points,this.myChoice.type, this.list_answers]);
        let ques = new Question({
            description: this.input_question,
            duration: this.myTime.duration.toString(),
            points: this.myPoints.points,
            question_type: this.myChoice.type,
            choices: this.list_answers
          });

        console.log('Question created:', ques);

        // add to the output the created question so the parent's component can get the question
        this.questionsService.addQuestion(ques);
        
        window.history.back();

    }


    /**
     * @author @HugoooR
     * @date 28/05/2024
     * @description Set the default values for the dropdown
     * @memberof CreateQuestionComponent
     */
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

        this.NOQChoices = [
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
        ];

    }
}