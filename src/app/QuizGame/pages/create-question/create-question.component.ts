import {Component, EventEmitter, Output} from '@angular/core';
import {Question} from 'src/app/core/models/api/question';
import {QuizQuestionsService} from '../../services/quizQuestions.service';
import {NumberOfQuestions, Points, Time, Type} from "../../../shared/dto/question.dto";
import {QuestionTypeEnum} from "../../dto/QuestionType";

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss']
})


export class CreateQuestionComponent {

    input_question: String = "";

    false_value: String = "False";

    true_value: String = "True";

    list_answers: String [] = [];

    timeChoices: Time[] | undefined;

    pointsChoices: Points[] | undefined;

    typeChoices: Type[] | undefined;

    NOQChoices: NumberOfQuestions[] | undefined;

    myChoice: Type | undefined;

    myPoints: Points | undefined;

    myTime: Time | undefined;

    myNOQ: NumberOfQuestions | undefined;

    protected readonly QuestionTypeEnum = QuestionTypeEnum;

    constructor(
        private readonly questionsService: QuizQuestionsService
    ) {
    }

    /**
     * @author @HugoooR
     * @date 14/05/2024
     * @description Create a question with the data
     * @memberof CreateQuestionComponent
     */
    createQuestion(): void {
        // Vérifiez les champs communs
        if (!this.myTime || !this.myChoice || !this.myPoints || !this.input_question) {
            return;
        }

        // Vérifiez list_answers seulement si le type est "MCQ"
        if (this.myChoice.type === QuestionTypeEnum.QCM && (!this.list_answers || this.list_answers.length === 0)) {
            return;
        }

        if (this.list_answers.length === 0) {
            this.list_answers = ["True", "False"]
        }

        //let ques = new Question([this.input_question,this.myTime.duration,this.myPoints.points,this.myChoice.type, this.list_answers]);
        let ques = {
            description: this.input_question,
            duration: this.myTime.duration.toString(),
            points: this.myPoints.points,
            question_type: this.myChoice.type,
            choices: this.list_answers.join(',')
        };

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
        this.onInitTimeChoices();
        this.onInitPointsChoices();
        this.onInitTypeChoices();
        this.onInitNOQChoices();
    }

    private onInitTimeChoices(): void {
        this.timeChoices = [
            {duration: 5},
            {duration: 10},
            {duration: 15},
            {duration: 20},
            {duration: 25},
            {duration: 30},
            {duration: 45},
            {duration: 60},
            {duration: 90},
            {duration: 120},
        ];
    }

    private onInitPointsChoices(): void {
        this.pointsChoices = [
            {points: 1},
            {points: 2},
            {points: 3},
            {points: 4},
            {points: 5},
            {points: 10},
        ];
    }

    private onInitTypeChoices(): void {
        this.typeChoices = [
            {type: QuestionTypeEnum.BOOLEAN},
            {type: QuestionTypeEnum.QCM},
        ];
    }

    private onInitNOQChoices(): void {
        this.NOQChoices = [
            {number: 2},
            {number: 3},
            {number: 4},
            {number: 5},
            {number: 6},
            {number: 7},
            {number: 8},
        ];
    }

    public get numberOfOptions(): any[] {
        if(!this.myNOQ) return [];
        return [].constructor(this.myNOQ.number > 2 ? this.myNOQ?.number : 2);
    }
}