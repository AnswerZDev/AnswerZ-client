import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FlashcardsSetComponent } from './component/flashcards-set/flashcards-set.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
        OverlayPanelModule,
        ToastModule
    ],
    declarations: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
    ],
    providers: [MessageService],
    exports: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
