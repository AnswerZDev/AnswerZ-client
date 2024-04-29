import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HomeFlashcardComponent } from './pages/home-flashcard/home-flashcard.component';
import { CardsPreviewComponent } from './component/cards-preview/cards-preview.component';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { AllFlashcardsSetComponent } from './component/all-flashcards-set/all-flashcards-set.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        DropdownModule,
        KeyFilterModule,
        CardModule,
        ButtonModule,
        HttpClientModule,
        InputTextModule,
        ToastModule,
        ConfirmPopupModule,
        PaginatorModule
    ],
    declarations: [
        HomeFlashcardComponent,
        CardsPreviewComponent,
        AllFlashcardsSetComponent,
    ],
    providers: [],
    exports: [
        CardsPreviewComponent
    ]
})
export class FlashcardModule { }