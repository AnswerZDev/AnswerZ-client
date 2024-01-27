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
import { PlayFlashcardComponent } from './component/play-flashcard/play-flashcard.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';

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
        HttpClientModule,
        InputTextModule,
        ToastModule,
        ConfirmPopupModule,
        ProgressBarModule,
        PaginatorModule
    ],
    declarations: [
        HomeFlashcardComponent,
        CreateFlashcardComponent,
        EditFlashcardComponent,
        GenericFlashcardComponent,
        CardsPreviewComponent,
        PlayFlashcardComponent
    ],
    providers: [],
    exports: []
})
export class FlashcardModule { }