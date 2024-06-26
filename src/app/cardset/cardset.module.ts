import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { CreateFlashcardSetComponent } from './component/create-flashcard-set/create-flashcard-set.component';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { EditFlashcardSetComponent } from './component/edit-flashcard-set/edit-flashcard-set.component';
import { GenericFlashcardSetComponent } from './pages/generic-flashcard-set/generic-flashcard-set.component';
import { CardsetRoutingModule } from './cardset-routing.module';
import { FlashcardModule } from 'src/app/flashcards/flashcards.module';
import { MyCardsetsComponent } from './pages/my-cardsets/my-cardsets.component';
import { CardsetComponent } from './component/cardset/cardset.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddFlashcardToSetComponent } from './pages/add-flashcard-to-cardset/add-flahscard-to-cardset.component';
import { MessageService } from 'primeng/api';
import { AllCardsetComponent } from './pages/all-cardset/all-cardset.component';
import { DialogModule } from 'primeng/dialog';
import { VisualizationCardsetComponent } from './component/visualization-cardset/visualization-cardset.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchCardsetComponent } from './component/search-cardset/search-cardset.component';
import { ToastModule } from 'primeng/toast';

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
        InputTextareaModule,
        ToastModule,
        ButtonModule,
        FlashcardModule,
        ConfirmPopupModule,
        PaginatorModule,
        ProgressBarModule,
        FlashcardModule,
        DialogModule,
        AutoCompleteModule
    ],
    declarations: [
        CreateFlashcardSetComponent,
        EditFlashcardSetComponent,
        GenericFlashcardSetComponent,
        MyCardsetsComponent,
        CardsetComponent,
        AddFlashcardToSetComponent,
        MyCardsetsComponent,
        AllCardsetComponent,
        VisualizationCardsetComponent,
        SearchCardsetComponent
    ],
    providers: [MessageService],
    exports: []
})
export class CardsetModule { }