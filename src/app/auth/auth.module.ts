import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf, TitleCasePipe } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
    ],
    declarations: [
        AuthRoutingModule,
    ],
    providers: [],
})
export class AuthModule { }
