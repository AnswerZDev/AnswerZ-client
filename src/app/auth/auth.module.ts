import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgClass, NgIf, TitleCasePipe } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './component/login/login.component'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        AuthRoutingModule,
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [],
})
export class AuthModule { }
