import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCardsetComponent } from "./component/all-cardset/all-cardset.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'all-cardset',
        pathMatch: 'full'
    },
    {
        path: 'all-cardset',
        component: AllCardsetComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CarsetRoutingModule { }