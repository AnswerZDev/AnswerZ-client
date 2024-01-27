import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateFlashcardSetComponent } from './component/create-flashcard-set/create-flashcard-set.component'
import { EditFlashcardSetComponent } from './component/edit-flashcard-set/edit-flashcard-set.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'create-flashcard-set', // à changer dans le futur,
        pathMatch: 'full'
    },
    {
        path: 'create-flashcard-set',
        component: CreateFlashcardSetComponent,
    },
    {
        path: 'edit-flashcard-set',
        component: EditFlashcardSetComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CardsetRoutingModule { }