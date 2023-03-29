import { Component, OnInit } from '@angular/core';
import { PainterService } from '../services/painter.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

  constructor(private shapeManager: PainterService) { }

  ngOnInit(): void {
  }

  undoLast() {
    this.shapeManager.undoLast();
  }

  redoLast() {
    this.shapeManager.redoLast();
  }

  downloadCanvas() {
    this.shapeManager.downloadCanvas();
  }

  uploadCanvas(e:any) {
    this.shapeManager.uploadCanvas(e);
  }
}
