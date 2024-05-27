import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from "../../../shared/services/security.services";
import {UserApi} from "../../../core/http/user/user.api";
import {Language} from "../../interface/language.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    private _languages: Language[] = [];
    public get languages(): Language[] {
        return this._languages;
    }

    public formLanguage: FormGroup = new FormGroup({
        language: new FormControl('fr', Validators.required)
    });

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        public readonly securityService: SecurityService,
        private readonly _userApi: UserApi
    ) {
        this.initializeLanguageValues();
        this.initLanguageForm();
    }

    public get profilePicture(): string | undefined {
        if (!this.securityService.user) return undefined;
        return this.securityService.user.pictureProfileUrl;
    }

    public get editMode(): boolean {
        return this.router.url.endsWith('edit');
    }

    public redirectToEditMode(): void {
        this.savePicture();
        this.saveLanguage();
        if(this.editMode) {
            this.router.navigate(['/user/profile']).then();
            return;
        }
        this.router.navigate(['edit'], {relativeTo: this.route}).then();
    }

    private savePicture(): void {
        if (this.editMode) {
            this.securityService.updateUser();
            return;
        }
    }

    private saveLanguage(): void {
        if (this.editMode) {
            const language: string = this.formLanguage.controls['language'].value;
            localStorage.setItem('language', language);
            window.location.reload();
        }
    }

    public uploadProfilePicture(event: any): void {
        let body = new FormData();
        body.append('photoProfile', event.files[0]);
        this.doUploadPhoto(body);
    }

    private doUploadPhoto(body: any): void {
        this._userApi.uploadPhoto(body).subscribe({
            next: (data) => {
            },
            error: (error) => {
            }
        });
    }

    private initializeLanguageValues(): void {
        this._languages = [
            {label: 'Français', code: 'fr'},
            {label: 'English', code: 'en'}
        ]
    }

    private initLanguageForm(): void {
        const language: string = localStorage.getItem('language') ?? 'fr';
        this.formLanguage.get('language')?.setValue(language);
    }
}
