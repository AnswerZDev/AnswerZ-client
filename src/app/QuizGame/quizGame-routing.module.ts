import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {createRoomComponent} from './pages/create-room/create-room.component'
import {CreateQuestionComponent} from './pages/create-question/create-question.component'
import {LobbyComponent} from './pages/lobby/lobby.component'
import {JoinRoomComponent} from './pages/join-room/join-room.component'
import {GameComponent} from './pages/game/game.component'
import {QuizEditComponent} from './pages/quiz-edit/quiz-edit.component'
import {MyQuizVisualizationComponent} from './pages/my-quiz-visualization/my-quiz-visualization.component'
import {userGuard} from '../core/guards/user.guard'
import {CreateQuizComponent} from "./pages/create-quiz/create-quiz.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'my-quiz',
        pathMatch: 'full',
    },
    {
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
                path: 'create-question/quiz/:quizId',
                component: CreateQuestionComponent,
            },
            {
                path: 'create-quiz',
                component: CreateQuizComponent,
            },
            {
                path: 'quiz-edit/:quizId',
                component: QuizEditComponent,
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizGameRoutingModule {
}
