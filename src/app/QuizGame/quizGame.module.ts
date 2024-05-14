import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { QuizGameRoutingModule } from './quizGame-routing.module'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        QuizGameRoutingModule,
        ButtonModule,
        InputTextModule,
    ],
    declarations: [
        RoomChoiceComponent,
        CreateQuestionComponent,
    ],
    providers: [],
})
export class QuizGameModule { }
