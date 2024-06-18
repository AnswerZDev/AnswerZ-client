import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Mode } from 'src/app/cardset/services/cardset.service';
import { Quiz } from 'src/app/core/models/api/quiz';
import {QuizQuestionsService} from "../../services/quizQuestions.service";

@Component({
    selector: "app-create-quiz",
    templateUrl: "./create-quiz.component.html",
    styleUrls: ["./create-quiz.component.scss"],
})
export class CreateQuizComponent implements OnInit {
    imageUrl: string = ""; // Image qu'on a reçu dans le formulaire de modification
    imageUpload: string = "../../../../assets/images/image_upload.svg";

    quizForm: FormGroup = new FormGroup({
        selectedCategory: new FormControl(null, Validators.required),
        selectedTitle: new FormControl(null, Validators.required),
        selectedVisibility: new FormControl(null, Validators.required),
        selectedMaxPlayers: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        description: new FormControl(null, Validators.required),
    });

    file: File | null = null;
    quizId: number | undefined;

    modesVisibility: Mode[] | undefined;
    modesCategories: Mode[] | undefined;
    blockChars: RegExp = /^[0-9a-zA-Z\s]+$/;

    constructor(
        private readonly _messageService: MessageService,
        private readonly _quizQuestionsService: QuizQuestionsService
    ) {}

    ngOnInit() {
        this.onInitModeVisibility();
        this.onInitModeCategory();
    }

    private onInitModeVisibility(): void {
        this.modesVisibility = [
            { name: "Public" },
            { name: "Private" }
        ];
    }

    private onInitModeCategory(): void {
        this.modesCategories = [
            { name: "Mathematics" },
            { name: "French" },
            { name: "English" },
            { name: "History" },
            { name: "Geography" },
            { name: "Science" },
            { name: "Sport" },
            { name: "Art" },
            { name: "Music" },
            { name: "Other" },
        ];
    }

    handleFileInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement.files;

        if (files && files.length > 0) {
            this.file = files[0];
            this.handleFile(files[0]);
        }
    }

    handleFile(file: File) {
        if (file.size > 25 * 1024 * 1024) {
            this._messageService.add({
                severity: "warning",
                detail: "Le fichier dépasse la taille maximale autorisée (25 Mo)",
            });
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            this.imageUrl = event.target?.result as string;
            console.log('image url :' + this.imageUrl)
            this.resizeImage(this.imageUrl, (resizedImageUrl: string) => {
                if (this.quizId === null || this.quizId === undefined) {
                    this.imageUpload = resizedImageUrl;
                } else {
                    this.imageUrl = resizedImageUrl;
                }
            });
        };

        reader.readAsDataURL(file);
    }

    resizeImage(imageDataUrl: string, callback: (resizedImageUrl: string) => void): void {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();

        image.onload = () => {
            const width = 400;
            const height = 400;

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(image, 0, 0, width, height);
                const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.75);
                callback(resizedImageUrl);
            }
        };

        image.src = imageDataUrl;
        image.setAttribute("crossOrigin", "anonymous");
    }

    onDragOver(event: Event) {
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();

        const files = event.dataTransfer?.files;

        if (files && files.length > 0) {
            this.file = files[0];
            if (this.quizId === null || this.quizId === undefined) {
                this.imageUpload = URL.createObjectURL(files[0]);
                this.handleFile(files[0]);
            } else {
                this.imageUrl = URL.createObjectURL(files[0]);
                this.handleFile(files[0]);
            }
        }
    }

    createQuiz(): void {
        if (this.quizForm.valid) {
            const formData = this.quizForm.value;
            const newQuiz = {
                title: formData.selectedTitle,
                description: formData.description,
                visibility: formData.selectedVisibility.name,
                category: formData.selectedCategory.name,
                maxPlayers: formData.selectedMaxPlayers,
                quizPicture: this.file!.name
            };

            this._quizQuestionsService.createQuiz(newQuiz);
        }
    }
}
