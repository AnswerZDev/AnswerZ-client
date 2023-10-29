import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { IndexComponent } from './component/index/index.component'

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
