import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description authentification form with email and password members. 
     *              The default value is null and both fields are required by Validators.
     * @type { FormGroup }
     * @memberof LoginComponent
     */
    public authForm: FormGroup = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    })

    constructor() { }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to register page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToRegister(): void { }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to forgot password page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToForgotPassword(): void { }
}
