import {Component} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {MessageService} from "primeng/api";
import {passwordConfirmValidator} from "../../../shared/validators/password-confirm.validator";
import {AuthService} from "../../services/auth.services";
import {Router} from "@angular/router";
import {SecurityService} from "../../../shared/services/security.services";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent{

    /**
     * @author @Alexis1663
     * @date 18/10/2023
     * @description
     * @type { FormGroup }
     * @memberof RegisterComponent
     */
    public authForm: FormGroup = new FormGroup({
        email: new FormControl(null, [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.minLength(10),
        ]),
        confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(10),
        ]),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        username: new FormControl(null, Validators.required),
    },)

    constructor(
        private readonly authService: AuthService,
        private readonly messageService: MessageService,
        private readonly router: Router,
        private readonly _securityService: SecurityService
    ) {
        this.onRedirectAuthentication();
    }

    /**
     * @author @Alexis1663
     * @date 01/02/2024
     * @description Use to redirect user to home page if he's already log in
     */
    private onRedirectAuthentication(): void {
        this._securityService.userLoad.subscribe({
            next: (value) => {
                if(value) {
                    this.router.navigate(['/home'])
                }
            }
        })
    }

    protected register(): void {
        this.authService.onSignUpEmitter.subscribe((isSuccess) => {
            if(!isSuccess) {
                this.messageService.add({
                    severity: 'error',
                    detail: 'An error occurred while registering the user. Please retry later.'
                });
            }
        });
        this.authService.register(this.authForm);
    }
}
