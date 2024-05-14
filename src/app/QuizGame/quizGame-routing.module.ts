import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'room-choice',
        pathMatch: 'full',
    },
    {
        path: 'room-choice',
        component: RoomChoiceComponent,
    },
    {
        path: 'create-question',
        component: CreateQuestionComponent,
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
