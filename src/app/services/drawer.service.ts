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

  private currentShapeInstance: Shape;

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

  setCurrentShape(shape: string) {
    this.currentShape = shape;
    
    switch (this.currentShape) {
      case "line":
        this.currentShapeInstance = new Line(new Point(), new Point(), this.properties);
        break;
      case "rectangle":
        this.currentShapeInstance = new Rectangle(new Point(), new Point(), this.properties);
        break;
      case "circle":
        this.currentShapeInstance = new Circle(new Point(), new Point(), this.properties);
        break;
    }

  }

  onDown(e: MouseEvent) {
    this.isMouseDown = true;
    
    this.startMouseDown = {
      x: e.offsetX,
      y: e.offsetY
    };
    this.endMouseDown = {
      x: e.offsetX,
      y: e.offsetY
    }

    this.currentShapeInstance.updateStartPoint({
      x: e.offsetX,
      y: e.offsetY
    });

    this.currentShapeInstance.updateEndPoint({
      x: e.offsetX,
      y: e.offsetY
    });
  }

  onUp(e: MouseEvent) {
    if(this.isMouseDown) {
      this.isMouseDown = false;

      let copy = null;

      switch (this.currentShape) {
        case "line":
          copy = new Line(this.currentShapeInstance.getStartPoint(), this.currentShapeInstance.getEndPoint(), this.properties);
          break;
        case "rectangle":
          copy = new Rectangle(this.currentShapeInstance.getStartPoint(), this.currentShapeInstance.getEndPoint(),  this.properties);
          break;
        case "circle":
          copy = new Circle(this.currentShapeInstance.getStartPoint(), this.currentShapeInstance.getEndPoint(),  this.properties);
          break;
      }

      this.shapes.push(copy);
      this.GlobalDraw();
    }
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

      this.currentShapeInstance.updateEndPoint(this.endMouseDown);

      this.currentShapeInstance.drawPhantom(this.canvas, this.ctx, this.properties);
      
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
