import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'

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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizGameRoutingModule { }
