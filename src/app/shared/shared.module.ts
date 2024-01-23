import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
        FooterComponent,
    ],
    providers: [MessageService],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
