import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spaceman',
  templateUrl: './spaceman.component.html',
  styleUrls: ['./spaceman.component.scss']
})
export class SpacemanComponent implements OnInit {
  cameraStream: Promise<void>;
  @ViewChild('starmanCanvas') starmanRef: ElementRef;
  @ViewChild('faceVideo') faceRef: ElementRef;
  starmanCanvas: CanvasRenderingContext2D;
  starmanImage: any;
  cameraOn: boolean;
  png: any;

  constructor() { }

  ngOnInit() {
    this.cameraOn = false;
    this.starmanCanvas = this.starmanRef.nativeElement.getContext('2d');
    this.starmanImage = new Image();
    this.starmanImage.src = 'assets/starman1.png';
    this.starmanImage.onload = () => {
      this.drawStarman();
    };
  }

  activateCamera() {
    this.cameraOn = true;
    this.streamFace();
  }

  deactivateCamera() {
    this.cameraOn = false;
    this.cameraStream = null;
  }

  streamFace() {
    const face: any = this.faceRef.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      this.cameraStream = navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
          face.src = window.URL.createObjectURL(stream);
          face.play();
          const faceInterval = setInterval(() => {
            this.starmanCanvas.drawImage(face, 540, 240, 200, 160);
            this.drawStarman();
            this.png = this.starmanRef.nativeElement.toDataURL();
          }, 41);
      });
    }
  }

  drawStarman() {
    this.starmanCanvas.drawImage(this.starmanImage, 0, 0, 1200, 620);
    this.starmanCanvas.font = '92px Oswald';
    this.starmanCanvas.fillStyle = 'white';
    this.starmanCanvas.fillText('haters gonna say its fake'.toUpperCase(), 40, 140, 1120);
    this.starmanCanvas.fillText('so real'.toUpperCase(), 800, 540, 360);
  }

  createStarmanPng() {
    this.png = this.starmanRef.nativeElement.toDataURL();
  }

}
