import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { QuizGameRoutingModule } from './quizGame-routing.module'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
<<<<<<< HEAD
import { LobbyComponent } from './pages/lobby/lobby.component';
import { CommonModule } from '@angular/common';
=======
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
>>>>>>> 4acc2fb5b2e943e9b9f7c3baf356ea83b247394b

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        CommonModule,
        NgClass,
        QuizGameRoutingModule,
        ButtonModule,
        InputTextModule,
    ],
    declarations: [
        RoomChoiceComponent,
        CreateQuestionComponent,
        LobbyComponent
    ],
    providers: [],
})
export class QuizGameModule { }
