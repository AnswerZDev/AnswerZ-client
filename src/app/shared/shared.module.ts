import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FlashcardsSetComponent } from './component/flashcards-set/flashcards-set.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
        OverlayPanelModule,
    ],
    declarations: [
        HeaderComponent,
        FlashcardsSetComponent,
    ],
    providers: [],
    exports: [
        HeaderComponent,
        FlashcardsSetComponent,
    ]
})
export class SharedModule { }
