import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './component/user-profile/user-profile.component';
import {UserRoutingModule} from './user-routing.module';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from "primeng/toast";
import {DropdownModule} from 'primeng/dropdown';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ButtonModule,
        FormsModule,
        AvatarGroupModule,
        AvatarModule,
        FileUploadModule,
        ToastModule,
        DropdownModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule
    ]
})
export class UserModule {
}
