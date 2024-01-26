import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FlashcardsSetComponent } from './component/flashcards-set/flashcards-set.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastService } from './services/toast.service';
import { ConfirmService } from './services/confirm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
        ToastModule
    ],
    declarations: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
    ],
    providers: [ToastService, ConfirmService, MessageService, ConfirmationService],
    exports: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
