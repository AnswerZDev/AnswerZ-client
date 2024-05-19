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
import { joinRoomComponent } from './pages/join-room/join-room.component'
import { DropdownModule } from 'primeng/dropdown';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component' 
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
        ProgressSpinnerModule

    ],
    declarations: [
        createRoomComponent,
        CreateQuestionComponent,
        LobbyComponent,
        joinRoomComponent,
        LobbyListComponent
    ],
    providers: [],
})
export class QuizGameModule { }
