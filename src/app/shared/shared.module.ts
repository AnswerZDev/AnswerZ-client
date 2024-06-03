import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgClass, NgIf} from '@angular/common'
import {ButtonModule} from 'primeng/button';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {FlashcardsSetComponent} from './component/flashcards-set/flashcards-set.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastService} from './services/toast.service';
import {ConfirmService} from './services/confirm.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import {TranslateModule} from "@ngx-translate/core";
import {UcFirstPipe} from "./pipes/uc-first.pipe";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
        OverlayPanelModule,
        ToastModule,
        AvatarModule,
        AvatarGroupModule,
        MenuModule,
        ToastModule,
        ConfirmPopupModule,
        TabMenuModule,
        TranslateModule
    ],
    declarations: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
        UcFirstPipe
    ],
    providers: [
        ToastService,
        ConfirmService,
        MessageService,
        ConfirmationService,
        UcFirstPipe
    ],
    exports: [
        HeaderComponent,
        FlashcardsSetComponent,
        FooterComponent,
        TranslateModule,
        UcFirstPipe
    ]
})
export class SharedModule {
}
