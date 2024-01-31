import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LoginComponent } from './component/login/login.component'
import {authGuard} from "../core/guards/auth.guard";

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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
