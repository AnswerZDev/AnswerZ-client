import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { HomeRoutingModule } from './home-routing.module'
import { IndexComponent } from './component/index/index.component';
import { HeaderComponent } from './component/header/header.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        HomeRoutingModule,
        ButtonModule,
    ],
    declarations: [
        IndexComponent,
        HeaderComponent,
    ],
    providers: [],
    exports: [HeaderComponent]
})
export class HomeModule { }
