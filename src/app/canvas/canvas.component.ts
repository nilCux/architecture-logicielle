import { Component, OnInit, HostListener } from '@angular/core';
import { ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass']
})
export class CanvasComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(private shapeService: ShapeService) { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.shapeService.initCanvas(this.canvas);
  }

  mouseDownPos: [number, number] = [0, 0];
  isMouseDown: Boolean = false;

  onDown(e: MouseEvent) {
    this.shapeService.onDown(e);
    this.isMouseDown = true;
    this.mouseDownPos = [e.offsetX, e.offsetY];
  }

  onUp(e: MouseEvent) {
    this.isMouseDown = false;
    this.ctx.beginPath();
    this.ctx.moveTo(...this.mouseDownPos);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.mouseDownPos = [0, 0];
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (this.isMouseDown) {
      /* TODO GHOST :)
      this.clearScreen();
      this.ctx.beginPath();
      this.ctx.moveTo(...this.mouseDownPos);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      */
    }
  }

}
