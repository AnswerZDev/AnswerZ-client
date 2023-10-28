import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf, TitleCasePipe } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './component/login/login.component'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HomeModule } from '../home/home.module'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        AuthRoutingModule,
        InputTextModule,
        ButtonModule,
        HomeModule,
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [],
})
export class AuthModule { }
