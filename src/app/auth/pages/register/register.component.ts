import {Component} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {MessageService} from "primeng/api";
import {passwordConfirmValidator} from "../../../shared/validators/password-confirm.validator";
import {AuthService} from "../../services/auth.services";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";
import {SecurityService} from "../../../shared/services/security.services";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: []
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
        fullName: new FormControl(null, Validators.required),
        username: new FormControl(null, Validators.required),
    },)

    constructor(
        private readonly authService: AuthService,
        private readonly toastService: ToastService,
        private readonly router: Router,
    ) {
    }

    protected register(): void {
        this.authService.onSignUpEmitter.subscribe((isSuccess) => {
            if(isSuccess) {
                this.router.navigate(['/home']);
            } else {
                this.toastService.toast(
                    'error',
                    'Error',
                    'An error occurred while registering the user. Please retry later.'
                );
            }

        });
        this.authService.register(this.authForm);
    }
}
