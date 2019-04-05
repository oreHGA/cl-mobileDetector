import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private http: HttpClient) {
  }

  fetch_predictions(imageData) {
    return this.http.post('https://api.cloudinary.com/v1_1/CLOUD_NAME/image/upload',
      {
        file: imageData,
        upload_preset: 'CLOUDINARY_UPLOAD_PRESET',
        api_key: 'CLOUDINARY_API_KEY'
      });
  }
}
