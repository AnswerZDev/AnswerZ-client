import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { QuizGameRoutingModule } from './quizGame-routing.module'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        CommonModule,
        NgClass,
        QuizGameRoutingModule,
    ],
    declarations: [
        RoomChoiceComponent,
        CreateQuestionComponent,
        LobbyComponent
    ],
    providers: [],
})
export class QuizGameModule { }
