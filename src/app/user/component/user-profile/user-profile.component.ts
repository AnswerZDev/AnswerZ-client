import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  
  public profil_picture: string = '../../../../assets/images/profil_user.png';
  public import_background: string = '../../../../assets/images/import_user2.svg';

  public data!: number;

  constructor(
    private readonly router: Router){
  }

  redirectToModifPage(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void{
    // this.dataservice.getData().subscribe(
    //   result => {
    //     this.data = result;
    //     console.log(this.data);
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
  }
  
}
