import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Router } from "express";
import * as path from "path";
import { DashboardAdminComponent } from "./component/dashboard-admin/dashboard-admin.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard-admin',
        pathMatch: 'full',
    },
    {
        path: 'dashboard-admin',
        component: DashboardAdminComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}
