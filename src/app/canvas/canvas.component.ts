import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../services/shape.service';

type Point = {
  x: number;
  y: number;
}

type Line = {
  p1: Point;
  p2: Point;
}

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

  // Indicates if mouse is down 
  isMouseDown: Boolean = false;
  // Start point when mouse is down
  startMouseDown: Point = {x: 0, y: 0};
  // End point when mouse is down
  endMouseDown: Point = {x: 0, y: 0};

  // Array of lines to be drawn
  lines:Line[] = [] ;
  // Number of lines to draw 
  nbLines: number = 0;

  onDown(e: MouseEvent) {
    this.shapeService.onDown(e);
    this.isMouseDown = true;
    this.startMouseDown = {
      x: e.offsetX, 
      y: e.offsetY
    };

    this.lines.push({
      p1: this.startMouseDown,
      p2: this.startMouseDown,
    });
  }

  onUp(e: MouseEvent) {
    this.isMouseDown = false;
    this.nbLines++;
    this.drawLines();
  }

  drawLines() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    for (let i=0;i<this.nbLines;i++) {
      this.ctx.moveTo(this.lines[i].p1.x, this.lines[i].p1.y);
      this.ctx.lineTo(this.lines[i].p2.x, this.lines[i].p2.y);
    }
    this.ctx.stroke();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lines.splice(0);
    this.nbLines=0;
  }

  getMousePos(e: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width, 
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    }
  }

  onMouseMove(e) { 
    if (this.isMouseDown) {
      // Draw old lines when tracing  
      this.drawLines();
      
      // Get mouse position 
      this.endMouseDown = this.getMousePos(e);
 
      // Draw current ghost line 
      this.lines.splice(this.nbLines,1,{ p1: this.startMouseDown, p2: this.endMouseDown});
      this.ctx.beginPath();
      this.ctx.setLineDash([5]);
      this.ctx.moveTo(this.startMouseDown.x, this.startMouseDown.y);
      this.ctx.lineTo(this.endMouseDown.x, this.endMouseDown.y);
      this.ctx.stroke();
    }
  }

  mouseOut(e) {
    if (this.isMouseDown) {
      this.onUp(e);
    }
  }
}
