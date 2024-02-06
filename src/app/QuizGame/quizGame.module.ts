import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { QuizGameRoutingModule } from './quizGame-routing.module'
import { RoomChoiceComponent } from './pages/room-choice/room-choice.component'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        QuizGameRoutingModule,
    ],
    declarations: [
        RoomChoiceComponent
    ],
    providers: [],
})
export class QuizGameModule { }
