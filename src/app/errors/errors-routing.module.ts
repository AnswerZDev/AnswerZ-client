import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from './pages/not-found/not-found.component'

const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule {}
