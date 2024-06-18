import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { QuizGameRoutingModule } from './quizGame-routing.module'
import { createRoomComponent } from './pages/create-room/create-room.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JoinRoomComponent } from './pages/join-room/join-room.component'
import { DropdownModule } from 'primeng/dropdown';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component' 
import { QRCodeModule } from 'angularx-qrcode';
import { GameComponent } from './pages/game/game.component';
import { QuizEditComponent } from './pages/quiz-edit/quiz-edit.component';
import { VisualizationQuestionQuizComponent } from './components/visualization-question-quiz/visualization-question-quiz.component'
import { DialogModule } from 'primeng/dialog';
import { MyQuizVisualizationComponent } from './pages/my-quiz-visualization/my-quiz-visualization.component';
import { MessageService } from 'primeng/api'
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component'
import { CardModule } from 'primeng/card'
import { KeyFilterModule } from 'primeng/keyfilter'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { InputTextareaModule } from 'primeng/inputtextarea'
import {InputNumberModule} from "primeng/inputnumber";

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
        DropdownModule,
        QRCodeModule,
        CardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        DropdownModule,
        KeyFilterModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        ConfirmPopupModule,
        InputTextareaModule,
        DialogModule,
        InputNumberModule,
    ],
    declarations: [
        createRoomComponent,
        CreateQuestionComponent,
        LobbyComponent,
        JoinRoomComponent,
        LobbyListComponent,
        GameComponent,
        CreateQuizComponent,
        QuizEditComponent,
        VisualizationQuestionQuizComponent,
        MyQuizVisualizationComponent
    ],
    providers: [],
})
export class QuizGameModule { }
