import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss']
})


export class CreateQuizComponent{
    imageUrl: string = ''; // Image qu'on a reçu dans le formulaire de modification
    imageUpload: string = "../../../../assets/images/image_upload.svg";
    quizForm!: FormGroup;
    file: File | null =  null;
    quizId: number = 0;




    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService
      ) {
        this.createForm();
      }
    
      private createForm() {
        this.quizForm = this.formBuilder.group({
          question: ['', [Validators.required]],
          answer: ['', [Validators.required]],
        });
      }



    handleFileInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement.files;
    
        if (files && files.length > 0) {
          this.file = files[0];
          this.handleFile(files[0]);
          this.resizeImage(this.imageUrl)
        }
      }

      handleFile(file: File) {
        if (file.size > 25 * 1024 * 1024) {
          this.messageService.add({ severity: "warning", detail: "Le fichier dépasse la taille maximale autorisée (25 Mo)" });
          return;
        }
      
        const reader = new FileReader();
      
        reader.onload = (event) => {
          this.imageUrl = event.target?.result as string;
          this.resizeImage(this.imageUrl);
        };
      
        reader.readAsDataURL(file);
      }
      
      resizeImage(imageDataUrl: string): void {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
      
        image.onload = () => {
          const width = 400;
          const height = 400;
      
          canvas.width = width;
          canvas.height = height;
      
          if (ctx) {
            ctx.drawImage(image, 0, 0, width, height);
            if(this.quizId === null || this.quizId === undefined){
              this.imageUpload = canvas.toDataURL("image/jpeg", 0.75);
            } else {
              this.imageUrl = canvas.toDataURL("image/jpeg", 0.75);
            }
          }
        };
    
        image.src = imageDataUrl;
        image.setAttribute('crossOrigin', 'anonymous');
      }
    
      
  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.file = files[0];
      if(this.quizId === null || this.quizId === undefined){
        this.imageUpload = URL.createObjectURL(files[0]);
        this.handleFile(files[0]);
        this.resizeImage(this.imageUpload);
      } else {
        this.imageUrl = URL.createObjectURL(files[0])
        this.handleFile(files[0]);
        this.resizeImage(this.imageUrl);
      }
    }
  }

}

