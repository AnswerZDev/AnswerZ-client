import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CreateFlashcardSetComponent } from './component/create-flashcard-set/create-flashcard-set.component'
import { EditFlashcardSetComponent } from './component/edit-flashcard-set/edit-flashcard-set.component'
import { MyCardsetsComponent } from './pages/my-cardsets/my-cardsets.component'
import { AddFlashcardToSetComponent } from './pages/add-flashcard-to-cardset/add-flahscard-to-cardset.component'
import { userGuard } from '../core/guards/user.guard'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'my-cardsets', // à changer dans le futur,
        pathMatch: 'full',
    },,
    {
        path: 'all-cardset',
        component: AllCardsetComponent,
    },
    {
        path: '',
        canActivate: [userGuard],
        children: [
            {
                path: 'my-cardsets',
                component: MyCardsetsComponent,
            },
            {
                path: 'create-flashcard-set',
                component: CreateFlashcardSetComponent,
            },
            {
                path: 'edit-flashcard-set/:cardsetId',
                component: EditFlashcardSetComponent,
            },
            {
                path: 'add-flashcard-to-set/:cardsetId',
                component: AddFlashcardToSetComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CardsetRoutingModule { }