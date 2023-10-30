import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        ButtonModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
