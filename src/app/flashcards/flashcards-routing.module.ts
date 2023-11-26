import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateFlashcardComponent} from './component/create-flashcard/create-flashcard.component'
import { EditFlashcardComponent } from './component/edit-flashcard/edit-flashcard.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'create-flashcard', // à changer dans le futur,
        pathMatch: 'full'
    },
    {
        path: 'create-flashcard',
        component: CreateFlashcardComponent,
    },
    {
        path: 'edit-flashcard',
        component: EditFlashcardComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlashcardRoutingModule { }