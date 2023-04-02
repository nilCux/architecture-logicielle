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

  public undoLast() {
    this.shapeManager.undoLast();
  }

  public redoLast() {
    this.shapeManager.redoLast();
  }

  public downloadCanvas() {
    this.shapeManager.downloadCanvas();
  }

  public uploadCanvas(readerEvent:any) {
    this.shapeManager.uploadCanvas(readerEvent);
  }
}
