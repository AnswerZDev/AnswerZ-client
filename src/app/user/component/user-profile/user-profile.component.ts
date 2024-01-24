import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  private allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif'];

  public profil_picture: string = '../../../../assets/images/profil_user.png';
  public import_background: string = '../../../../assets/images/import_user2.svg';
  public picture_friend: string = '../../../../assets/images/profil.jpeg';
  public data!: number;
  public picture_friend2: string = '../../../../assets/images/carreau.jpeg';
  public picture_friend3: string = '../../../../assets/images/hugo.jpeg';
  public picture_friend4: string = '../../../../assets/images/audric.jpeg';
  public previewImage: string="";

  public backgroundImageUrl: string = "../../../../assets/images/audric.jpeg";

  constructor(
    private readonly router: Router,
  ){
  }

  redirectToModifPage(): void {
    this.router.navigate(['/']);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileExtension: string = this.getFileExtension(file.name);

      if(this.isExtensionAllowed(fileExtension, this.allowedExtensions)){
        this.getFileExtension(file.name)
      } else {
        //  TODO() => à refaire(toast primeng !)
      }
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  private isExtensionAllowed(filename: string, allowedExtensions: string[]): boolean {
    const fileExtension: string = this.getFileExtension(filename).toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }
  
  private getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

}
