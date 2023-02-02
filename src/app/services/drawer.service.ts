import { Injectable } from '@angular/core';
import { Properties } from './properties.service';
import { Line } from './shapes/line.service';
import { Point } from './shapes/point.service';
import { Rectangle } from './shapes/rectangle.service'
import { Circle } from './shapes/circle.service'
import { Shape } from './shape.service'

@Injectable({
  providedIn: 'root'
})

export class DrawerService {

  // Indicates if mouse is down
  public isMouseDown: Boolean = false;
  // Start point when mouse is down
  public startMouseDown: Point = {x: 0, y: 0};
  // End point when mouse is down
  public endMouseDown: Point = {x: 0, y: 0};

  // Array of shapes to be drawn
  public shapes:Shape[] = [];

  // Current shape to be drawn
  public currentShape: string = "line";

  constructor(protected canvas: HTMLCanvasElement, protected ctx: CanvasRenderingContext2D, protected properties: Properties) {
  }

   GlobalDraw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    console.warn(this.shapes)
    for (let i=0;i<this.shapes.length;i++) {
      this.shapes[i].drawSelf(this.canvas,this.ctx,this.properties);
    }
    this.ctx.stroke();
  }

  onDown(e: MouseEvent, shape: string) {
    this.currentShape = shape
    this.isMouseDown = true;
    this.startMouseDown = {
      x: e.offsetX,
      y: e.offsetY
    };
    this.endMouseDown = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  onUp(e: MouseEvent) {
    this.isMouseDown = false;
    let shapeInstace
    switch (this.currentShape) {
      case "line":
        shapeInstace = new Line(this.startMouseDown, this.endMouseDown, this.properties);
        break;
      case "rectangle":
        shapeInstace = new Rectangle(this.startMouseDown, this.endMouseDown, this.properties);
        break;
      case "circle":
        shapeInstace = new Circle(this.startMouseDown, this.endMouseDown, this.properties);
        break;
    }

    this.shapes.push(shapeInstace);
    this.GlobalDraw();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.splice(0);
  }

  onMouseMove(e) {
    if (this.isMouseDown) {
      // Draw old lines when tracing
      this.GlobalDraw();

      // Get mouse position
      this.endMouseDown = this.getMousePos(e);

      // Draw current ghost line
      this.ctx.beginPath();
      this.ctx.setLineDash([5]);
      this.ctx.moveTo(this.startMouseDown.x, this.startMouseDown.y);
      this.ctx.lineTo(this.endMouseDown.x, this.endMouseDown.y);
      this.ctx.stroke();
    }
  }

  mouseOut(e: MouseEvent) {
    if(this.isMouseDown) {
      this.onUp(e);
    }
  }

  private getMousePos(e: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    }
  }

}
