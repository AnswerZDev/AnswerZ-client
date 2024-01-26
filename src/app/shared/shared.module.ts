import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastService } from './services/toast.service';
import { ConfirmService } from './services/confirm.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
        ToastModule,
        ConfirmPopupModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [ToastService, ConfirmService, MessageService, ConfirmationService],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
