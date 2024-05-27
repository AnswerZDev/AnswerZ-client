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
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ModifyPopUpComponent } from './component/modify-pop-up/modify-pop-up.component';
import { MessageService } from 'primeng/api';

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
        ModifyPopUpComponent
    ],
    providers: [MessageService],
    exports: [
        CardsPreviewComponent
    ]
})
export class FlashcardModule { }