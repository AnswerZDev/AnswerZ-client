import {Component, OnInit} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import {SecurityService} from "../../../shared/services/security.services";
import {first} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit{

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
        private readonly securityService: SecurityService,
        private readonly messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.onRedirectAuthentification();
    }

    /**
     * @author @Alexis1663
     * @date 01/02/2024
     * @description Use to redirect user to home page if he's already log in
     */
    private onRedirectAuthentification(): void {
        this.securityService.userLoad.subscribe({
            next: (value) => {
                if(value) {
                    this.router.navigate(['/home'])
                }
            }
        })
    }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to register page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToRegister(): void {
        this.router.navigate(['/auth/register'])
    }

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description redirect to forgot password page. Using redirectTo tool.
     * @memberof LoginComponent
     */
    public redirectToForgotPassword(): void {
        this.router.navigate(['/auth/forgot-password'])
    }

    /**
     * @author @Alexis1663
     * @date 29/10/2023
     * @description
     * @memberof LoginComponent
     */
    public login(): void {
        if (this.authForm.valid) {
            this.securityService.onSuccessSignin.pipe(first()).subscribe({
                next: (value) => {
                    if(!value) {
                        this.messageService.add({ severity: 'error', summary: 'Une erreur est survenu', detail: 'Identifiants ou mot de passe incorrect' });
                    }
                },
            })
            this.securityService.login(this.authForm.value.email, this.authForm.value.password)
        }
    }
}
