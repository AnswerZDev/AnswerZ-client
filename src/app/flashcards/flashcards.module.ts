import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { CreateFlashcardComponent } from './component/create-flashcard/create-flashcard.component';
import { FlashcardRoutingModule } from './flashcards-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FlashcardGenericComponent } from './component/flashcard-generic/flashcard-generic.component';
import { EditFlashcardComponent } from './component/edit-flashcard/edit-flashcard.component';

@NgModule({
    imports: [
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
        FlashcardGenericComponent,
        CreateFlashcardComponent,
        EditFlashcardComponent,
    ],
    providers: [],
    exports: []
})
export class FlashcardModule { }