import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { CreateFlashcardComponent } from './component/create-flashcard/create-flashcard.component';
import { FlashcardRoutingModule } from './flashcards-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HomeFlashcardComponent } from './pages/home-flashcard/home-flashcard.component';
import { EditFlashcardComponent } from './component/edit-flashcard/edit-flashcard.component';
import { GenericFlashcardComponent } from './component/generic-flashcard/generic-flashcard.component';
import { CardsPreviewComponent } from './component/cards-preview/cards-preview.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        FlashcardRoutingModule,
        DropdownModule,
        KeyFilterModule,
        CardModule,
        ButtonModule,
    ],
    declarations: [
        HomeFlashcardComponent,
        CreateFlashcardComponent,
        EditFlashcardComponent,
        GenericFlashcardComponent,
        CardsPreviewComponent,
    ],
    providers: [],
    exports: []
})
export class FlashcardModule { }