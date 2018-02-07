import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spaceman',
  templateUrl: './spaceman.component.html',
  styleUrls: ['./spaceman.component.scss']
})
export class SpacemanComponent implements OnInit {
  @ViewChild('starmanCanvas') starmanRef: ElementRef;
  @ViewChild('faceVideo') faceRef: ElementRef;

  constructor() { }

  ngOnInit() {
    const starman: CanvasRenderingContext2D =
    this.starmanRef.nativeElement.getContext('2d');
    const image = new Image();
    image.src = 'assets/starman1.jpg';
    image.onload = () => {
      starman.drawImage(image, 0, 0, 1200, 620);
      starman.font = '92px Oswald';
      starman.fillStyle = 'white';
      starman.fillText('haters gonna say its fake'.toUpperCase(), 40, 140, 1120);
      starman.fillText('so real'.toUpperCase(), 800, 540, 360);
    };
    this.streamFace();
  }

  streamFace() {
    const face: any = this.faceRef.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          face.src = window.URL.createObjectURL(stream);
          face.play();
      });
    }
  }

  // snapFace() {
  //   const context = canvas.getContext('2d');
  //   if (width && height) {
  //     canvas.width = width;
  //     canvas.height = height;
  //     context.drawImage(video, 0, 0, width, height);
    
  //     var data = canvas.toDataURL('image/png');
  //     photo.setAttribute('src', data);
  //   } else {
  //     clearphoto();
  //   }
  // }

}
