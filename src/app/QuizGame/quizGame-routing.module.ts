import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { createRoomComponent } from './pages/create-room/create-room.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { JoinRoomComponent } from './pages/join-room/join-room.component'
import { GameComponent } from './pages/game/game.component'
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'room-choice',
        pathMatch: 'full',
    },
    {
        path: 'create-game',
        component: createRoomComponent,
    },
    {
        path: 'create-question',
        component: CreateQuestionComponent,
    },
    {
        path: 'join-game',
        component: JoinRoomComponent,
    },
    {
        path: 'quizz-lobby/:roomId',
        component: LobbyComponent,
    },
    {
        path: 'game/:roomId',
        component: GameComponent,
    },
    {
        path: 'create-quiz',
        component: CreateQuizComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizGameRoutingModule { }
