import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FlashcardsService {
    private baseUrl = 'http://localhost:3000/flashcard';

    constructor(private http: HttpClient) { }

    getAllFlashcards(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
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
