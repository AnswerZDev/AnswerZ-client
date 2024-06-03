import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './pages/login/login.component'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import {ToastModule} from "primeng/toast";
import {RegisterComponent} from "./pages/register/register.component";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        AuthRoutingModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        NgOptimizedImage,
        TranslateModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        RegisterComponent,
    ],
    providers: [],
})
export class AuthModule { }
