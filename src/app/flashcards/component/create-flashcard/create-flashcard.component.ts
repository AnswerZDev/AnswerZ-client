import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Mode{
  name: string;
}

@Component({
  selector: 'app-create-flashcard',
  templateUrl: './create-flashcard.component.html',
  styleUrls: ['./create-flashcard.component.scss'],
})
export class CreateFlashcardComponent implements OnInit {

  modesVisibilite: Mode[] | undefined;
  modesCategorie: Mode[] | undefined;
  selectedModeVisibilities: Mode | undefined;
  selectedModeCategories: Mode | undefined;
  blockChars: RegExp = /^[0-9a-zA-Z\s]+$/;
  public imageUpload: string = "../../../../assets/images/image_upload.png";
  

  ngOnInit() {
    this.modesVisibilite = [
        { name: 'Public' },
        { name: 'Private' },
    ];
    this.modesCategorie = [
      { name: 'English' },
      { name: 'Sport' },
      { name: 'Mathematics' },
      { name: 'Chemical Physics'}
    ];
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.handleImageFile(file);
    }
  }

  uploadImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.handleImageFile(file);
    }
  }

  handleImageFile(file: File) {
    const maxSizeInBytes = 25 * 1024 * 1024; // 25 Mo en octets

    if (file.size <= maxSizeInBytes) {
      const imgLink = URL.createObjectURL(file);
      this.imageUpload = imgLink;
    } else {
      alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier de 25 Mo ou moins.");
    }
  }

  moveToPreview() {
    const totalHeight = document.documentElement.scrollHeight;
    // Déplacer la fenêtre vers le haut de la section de prévisualisation
    window.scrollTo({
      top: totalHeight,
      behavior: 'smooth'
    });
  }
}
