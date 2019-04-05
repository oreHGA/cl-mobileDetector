import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DetectorService } from '../services/detector.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DetectorService]
})

export class HomePage {
  currentImage;
  api_response: any;
  results: Observable<any>;
  small_list = ['a', 'b', 'c'];

  constructor(private camera: Camera, private detector: DetectorService) { }

  takePicture() {
    console.log('take pic');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Unable to take picture: " + err);
    })
  }

  detectImage() {
    console.log('detecting image');
    let call = this.detector.fetch_predictions(this.currentImage)

    call.subscribe((data) => {
      let result: any = data;
      if (result.info != null) {
        this.api_response = result.info.categorization.imagga_tagging.data;
      }
    });
  }

  removePicture() {
    console.log('cancel pikkkc');
    this.currentImage = null;
    this.api_response = null;
  }
}
