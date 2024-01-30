import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LoginComponent } from './component/login/login.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'

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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
