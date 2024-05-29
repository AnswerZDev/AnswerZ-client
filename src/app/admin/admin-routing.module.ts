import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardAdminComponent } from "./component/dashboard-admin/dashboard-admin.component";
import { userGuard } from "../core/guards/user.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard-admin',
        pathMatch: 'full',
    },
    {
        path: 'dashboard-admin',
        canActivate: [userGuard],
        component: DashboardAdminComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}
