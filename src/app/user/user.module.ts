import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';
import {ToastModule} from "primeng/toast";


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
    ToastModule
  ]
})
export class UserModule { }
