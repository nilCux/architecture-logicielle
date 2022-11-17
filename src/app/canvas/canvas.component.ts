import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass']
})
export class CanvasComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  
  constructor() { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  mouseDownPos: [number, number] = [0, 0];
  isMouseDown: Boolean = false;

  onDown(e: MouseEvent) {
    this.isMouseDown = true;
    this.mouseDownPos = [e.offsetX, e.offsetY];
  }

  onUp(e : MouseEvent) {
    this.isMouseDown = false;
    var canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(...this.mouseDownPos);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
    this.mouseDownPos = [0, 0];
  }

  clearScreen() {
    var canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (this.isMouseDown) {
      this.clearScreen();
      var canvas = <HTMLCanvasElement>document.getElementById('drawzone');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(...this.mouseDownPos);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    }
  }

}
