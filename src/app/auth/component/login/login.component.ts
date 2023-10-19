<<<<<<< HEAD
=======
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

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

    constructor(
        private readonly router: Router,
    ) { }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to register page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToRegister(): void {
        this.router.navigate(['../register'])
    }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to forgot password page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToForgotPassword(): void {
        this.router.navigate(['../forgot-password'])
    }
}
>>>>>>> ea329e2 (:hammer: update: routing)
