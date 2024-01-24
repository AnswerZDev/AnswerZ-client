import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./component/user-profile/user-profile.component";
import { EditProfileComponent } from "./component/edit-profile/edit-profile.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: UserProfileComponent,
    },
    {
        path: 'profile/edit',
        component: EditProfileComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}