import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, NgClass, NgIf } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HomeFlashcardComponent } from './pages/home-flashcard/home-flashcard.component';
import { CardsPreviewComponent } from './component/cards-preview/cards-preview.component';
import { ModifyPopUpComponent } from './component/modify-pop-up/modify-pop-up.component';
import { AllFlashcardsSetComponent } from './component/all-flashcards-set/all-flashcards-set.component';
import { PlayFlashcardComponent } from './component/play-flashcard/play-flashcard.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { FlashcardRoutingModule } from './flashcards-routing.module';

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
        ProgressBarModule,
        PaginatorModule,
        DialogModule,
        FlashcardRoutingModule
    ],
    declarations: [
        HomeFlashcardComponent,
        CardsPreviewComponent,
        AllFlashcardsSetComponent,
        ModifyPopUpComponent,
        PlayFlashcardComponent
    ],
    providers: [MessageService],
    exports: [
        CardsPreviewComponent
    ]
})
export class FlashcardModule { }