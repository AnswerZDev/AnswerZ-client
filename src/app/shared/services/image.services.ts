import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.post('/api/upload', formData);
  }
}
