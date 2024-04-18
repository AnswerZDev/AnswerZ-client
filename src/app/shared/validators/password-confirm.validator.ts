import { AbstractControl, ValidationErrors } from '@angular/forms'

export function passwordConfirmValidator(
    controlName: string
): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value !== control.root.get(controlName)?.value) {
            return { passwordConfirm: true }
        }
        return null
    }
}
