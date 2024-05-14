import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { PlayFlashcardComponent } from './component/play-flashcard/play-flashcard.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'play-flashcard', // à changer dans le futur,
        pathMatch: 'full',
    },
    
    {
        path: 'play-flashcard',
        component: PlayFlashcardComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlashcardRoutingModule { }