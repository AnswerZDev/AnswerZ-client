import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from "../../../shared/services/security.services";
import {environment} from "../../../../environments/environment";
import {UploadEvent} from "primeng/fileupload";
import {UserApi} from "../../../core/http/user/user.api";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        public readonly securityService: SecurityService,
        private readonly _userApi: UserApi
    ) {
    }

    public get profilePicture(): string | undefined {
        if (!this.securityService.user) return undefined;
        return this.securityService.user.pictureProfileUrl;
    }

    public get editMode(): boolean {
        return this.router.url.endsWith('edit');
    }

    public redirectToEditMode(): void {
        if (this.editMode) {
            this.router.navigate(['/user/profile']).then();
            this.securityService.updateUser();
            return;
        }
        this.router.navigate(['edit'], {relativeTo: this.route}).then();
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
}
