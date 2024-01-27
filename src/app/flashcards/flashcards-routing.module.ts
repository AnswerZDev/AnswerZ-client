import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateFlashcardComponent} from './component/create-flashcard/create-flashcard.component'
import { EditFlashcardComponent } from './component/edit-flashcard/edit-flashcard.component'
import { AllFlashcardsSetComponent } from './component/all-flashcards-set/all-flashcards-set.component'
import { CardsPreviewComponent } from './component/cards-preview/cards-preview.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'all-flashcardset', // à changer dans le futur,
        pathMatch: 'full'
    },
    {
        path: 'all-flashcardset',
        component: AllFlashcardsSetComponent
    },
    {
        path: 'create-flashcard',
        component: CreateFlashcardComponent,
    },
    {
        path: 'edit-flashcard',
        component: EditFlashcardComponent,
    },
    {
        path: 'cards-preview',
        component: CardsPreviewComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlashcardRoutingModule { }