import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss']
})

export class CreateQuestionComponent{
    
    public e_value = "";

    /**
     * @author @HugoooR
     * @date 14/05/2024
     * @description Create a question with the data
     * @memberof HomePage
     */
    createQuestion(): void {
        
    }
}