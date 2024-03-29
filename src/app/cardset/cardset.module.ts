import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { CreateFlashcardSetComponent } from './component/create-flashcard-set/create-flashcard-set.component';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { EditFlashcardSetComponent } from './component/edit-flashcard-set/edit-flashcard-set.component';
import { GenericFlashcardSetComponent } from './pages/generic-flashcard-set/generic-flashcard-set.component';
import { CardsetRoutingModule } from './cardset-routing.module';
import { FlashcardModule } from 'src/app/flashcards/flashcards.module';
import { MyCardsetsComponent } from './pages/my-cardsets/my-cardsets.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        CardsetRoutingModule,
        DropdownModule,
        KeyFilterModule,
        CardModule,
        ButtonModule,
        HttpClientModule,
        InputTextModule,
        ToastModule,
        ConfirmPopupModule,
        PaginatorModule,
        FlashcardModule
    ],
    declarations: [
        CreateFlashcardSetComponent,
        EditFlashcardSetComponent,
        GenericFlashcardSetComponent,
        MyCardsetsComponent
    ],
    providers: [],
    exports: []
})
export class CardsetModule { }