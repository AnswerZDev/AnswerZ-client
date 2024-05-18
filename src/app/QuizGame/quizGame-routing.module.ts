import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { createRoomComponent } from './pages/create-room/create-room.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { joinRoomComponent } from './pages/join-room/join-room.component'

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
        component: joinRoomComponent,
    },
    {
        path: 'quizz-lobby/:roomId',
        component: LobbyComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizGameRoutingModule { }
