import { Injectable } from '@angular/core';
import { Properties } from './properties.service';
import { Line } from './shapes/line.service';
import { Point } from './shapes/point.service';
import { Rectangle } from './shapes/rectangle.service'
import { Circle } from './shapes/circle.service'

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
  public shapes = [];
  // Number of shapes to draw
  public nbShapes: number = 0;

  constructor(protected canvas: HTMLCanvasElement, protected ctx: CanvasRenderingContext2D,protected properties: Properties) {

  }

   GlobalDraw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    for (let i=0;i<this.nbShapes;i++) {
      this.shapes[i].drawSelf(this.canvas,this.ctx,this.properties);
    }
    this.ctx.stroke();
  }

  onDown(e: MouseEvent, shape: string) {
    this.isMouseDown = true;
    this.startMouseDown = {
      x: e.offsetX,
      y: e.offsetY
    };

    let shapeInstace
    switch (shape) {
      case "line":
        shapeInstace = new Line(this.startMouseDown, this.startMouseDown, this.properties);
        break;
      case "rectangle":
        shapeInstace = new Rectangle(this.startMouseDown, this.startMouseDown, this.properties);
        break;
      case "circle":
        shapeInstace = new Circle(this.startMouseDown, this.startMouseDown, this.properties);
        break;
    }
    this.shapes.push(shapeInstace);
  }

  onUp(e: MouseEvent) {
    this.isMouseDown = false;
    this.nbShapes++;
    this.GlobalDraw();
  }

}
