import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class FlashcardsService extends ApiService {
    private baseUrl = 'http://localhost:3000/flashcard';

    constructor(http: HttpClient) { 
        super('');
    }

    getAllFlashcards() {
        return this.get('flashcard');
    }

    getFlashcardById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createFlashcard(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, data);
    }

    updateFlashcard(id: number, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    deleteFlashcard(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
