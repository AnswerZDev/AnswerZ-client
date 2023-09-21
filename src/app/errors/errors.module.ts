import { NgModule } from '@angular/core'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { ErrorsRoutingModule } from './errors-routing.module'

@NgModule({
    imports: [ErrorsRoutingModule],
    declarations: [NotFoundComponent],
    providers: [],
})
export class ErrorsModule {}
