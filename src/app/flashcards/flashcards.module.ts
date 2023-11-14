import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { CreateFlashcardComponent } from './component/create-flashcard/create-flashcard.component';
import { FlashcardRoutingModule } from './flashcards-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

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
        CreateFlashcardComponent,
    ],
    providers: [],
    exports: []
})
export class FlashcardModule { }