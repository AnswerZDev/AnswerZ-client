import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateFlashcardSetComponent } from './component/create-flashcard-set/create-flashcard-set.component'
import { EditFlashcardSetComponent } from './component/edit-flashcard-set/edit-flashcard-set.component'
import { MyCardsetsComponent } from './pages/my-cardsets/my-cardsets.component'
import { AllCardsetComponent } from './pages/all-cardset/all-cardset.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'my-cardsets', // à changer dans le futur,
        pathMatch: 'full',
    },
    {
        path: 'my-cardsets',
        component: MyCardsetsComponent,
    },
    {
        path: 'create-flashcard-set',
        component: CreateFlashcardSetComponent,
    },
    {
        path: 'edit-flashcard-set',
        component: EditFlashcardSetComponent,
    },
    {
        path: 'all-cardset',
        component: AllCardsetComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CardsetRoutingModule { }