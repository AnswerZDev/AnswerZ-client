import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./component/user-profile/user-profile.component";
import {authGuard} from "../core/guards/auth.guard";
import {userGuard} from "../core/guards/user.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        canActivate: [userGuard],
        component: UserProfileComponent,
    },
    {
        path: 'profile/edit',
        canActivate: [userGuard],
        component: UserProfileComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}