import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SecurityService} from "../../../shared/services/security.services";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(
    private readonly router: Router,
    private readonly _securityService: SecurityService,
  ){
  }

  public get profilePicture(): string | undefined{
    if(!this._securityService.user) return undefined;
    return this._securityService.user.pictureProfileUrl;
  }
}
