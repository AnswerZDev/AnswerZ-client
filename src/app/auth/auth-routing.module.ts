import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LoginComponent } from './pages/login/login.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
