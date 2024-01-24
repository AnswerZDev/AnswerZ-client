import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'
import { HomeRoutingModule } from './home-routing.module'
import { IndexComponent } from './component/index/index.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        HomeRoutingModule,
        ButtonModule,
        InputTextModule,
        SharedModule
    ],
    declarations: [
        IndexComponent,
    ],
    providers: [],
    exports: [
        ButtonModule,
    ]
})
export class HomeModule { }
