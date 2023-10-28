import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { IndexComponent } from './component/index/index.component'
import { HeaderComponent } from './component/header/header.component'

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
