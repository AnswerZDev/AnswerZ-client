import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { createRoomComponent } from './pages/create-room/create-room.component'
import { CreateQuestionComponent } from './pages/create-question/create-question.component'
import { LobbyComponent } from './pages/lobby/lobby.component'
import { JoinRoomComponent } from './pages/join-room/join-room.component'
import { GameComponent } from './pages/game/game.component'
import { QuizEditComponent } from './pages/quiz-edit/quiz-edit.component'
import { MyQuizVisualizationComponent } from './pages/my-quiz-visualization/my-quiz-visualization.component'
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component'
import { userGuard } from '../core/guards/user.guard'
import { userGuard } from '../core/guards/user.guard'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'my-quiz',
        pathMatch: 'full',
    },
    {
        path: 'my-quiz',
        canActivate: [userGuard],
        component: MyQuizVisualizationComponent,
    },
    {
        path: 'create-game',
        canActivate: [userGuard],
        component: createRoomComponent,
    },
    {
        path: 'create-question/quiz/:quizId',
        canActivate: [userGuard],
        component: CreateQuestionComponent,
    },
    {
        path: 'join-game',
        canActivate: [userGuard],
        component: JoinRoomComponent,
    },
    {
        path: 'quizz-lobby/:roomId',
        canActivate: [userGuard],
        component: LobbyComponent,
    },
    {
        path: 'game/:roomId',
        canActivate: [userGuard],
        component: GameComponent,
    },
    {
        path: 'create-quiz',
        canActivate: [userGuard],
        component: CreateQuizComponent,
    },
    {
        path: 'quiz-edit/:quizId',
        canActivate: [userGuard],
        component: QuizEditComponent,
    },
        path: '',
        canActivate: [userGuard],
        children: [
            {
                path: 'my-quiz',
                component: MyQuizVisualizationComponent,
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
                path: 'quiz-edit',
                component: QuizEditComponent,
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizGameRoutingModule { }
