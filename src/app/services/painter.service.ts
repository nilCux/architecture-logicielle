import { Injectable } from '@angular/core';
import { Properties } from './properties.service';
import { Line } from './shapes/line.service';
import { Point } from './shapes/point.service';
import { Rectangle } from './shapes/rectangle.service'
import { Circle } from './shapes/circle.service'
import { Shape } from './shape.service'
import * as _ from 'lodash';
import { Triangle } from './shapes/triangle.service';
import { Hexagon } from './shapes/hexagon.service';
import { Arrow } from './shapes/arrow.service';

@Injectable({
  providedIn: 'root'
})

export class PainterService {

  // Indicates if mouse is down
  private isMouseDown: Boolean = false;
  // Start point when mouse is down
  private startMouseDown: Point = { x: 0, y: 0 };
  // End point when mouse is down
  private endMouseDown: Point = { x: 0, y: 0 };

  // Array of shapes to be drawn
  private shapes: Shape[] = [];
  private deleted: Shape[] = []

  // Current shape to be drawn
  private currentShapeInstance: Shape;
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  // Canvas to be load
  private loadCanvas: HTMLImageElement;

  constructor(private propertiesService: Properties) {
  }

  GlobalDraw() {    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if(this.loadCanvas !== undefined)
      this.ctx.drawImage(this.loadCanvas,0,0)

    console.warn(this.shapes)
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].drawSelf(this.canvas, this.ctx);
      if(this.shapes[i].properties.getFill()){
        this.ctx.fillStyle = this.shapes[i].properties.getBackgroundColor();
        this.ctx.fill();
      }
    }

    this.ctx.strokeStyle = this.propertiesService.getColor();
    this.ctx.lineWidth = this.propertiesService.getWidth();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setCurrentShape("line");
    this.propertiesService.updateColor("rgba(0,19,255,1)");
    this.propertiesService.updateBackgroundColor("rgba(0,19,255,1)");
    this.propertiesService.updateWidth(1);
  }

  setColor(color: string) {
    this.propertiesService.updateColor(color);
    console.log('color', color)
  }

  setBackgroundColor(color: string) {
    this.propertiesService.updateBackgroundColor(color);
    console.log('color', color)
  }

  setWidth(width: number) {
    this.propertiesService.updateWidth(width);
    console.log('width', width)
  }

  setFill(fill: boolean) {
    this.propertiesService.updateFill(fill);
    console.log('fillmode', fill)
  }

  setCurrentShape(shape: string) {

    switch (shape) {
      case "line":
        this.currentShapeInstance = new Line(new Point(), new Point(), this.propertiesService);
        break;
      case "rectangle":
        this.currentShapeInstance = new Rectangle(new Point(), new Point(), this.propertiesService);
        break;
      case "circle":
        this.currentShapeInstance = new Circle(new Point(), new Point(), this.propertiesService);
        break;
      case "triangle":
        this.currentShapeInstance = new Triangle(new Point(), new Point(), this.propertiesService);
        break;
      case "hexagon":
        this.currentShapeInstance = new Hexagon(new Point(), new Point(), this.propertiesService);
        break;
      case "arrow":
        this.currentShapeInstance = new Arrow(new Point(), new Point(), this.propertiesService);
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
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.shapes.push(_.cloneDeep(this.currentShapeInstance));
      this.GlobalDraw();
    }
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.splice(0);
    this.loadCanvas = undefined;
  }

  onMouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      // Draw old lines when tracing
      this.GlobalDraw();

      // Get mouse position
      this.endMouseDown = this.getMousePos(e);

      this.currentShapeInstance.updateEndPoint(this.endMouseDown);

      this.currentShapeInstance.drawPhantom(this.canvas, this.ctx);

    }
  }

  mouseOut(e: MouseEvent) {
    if (this.isMouseDown) {
      this.onUp(e);
    }
  }

  undoLast() {
    if (this.shapes.length != 0) {
      let last: Shape = this.shapes.pop();
      this.deleted.push(last);
      this.GlobalDraw();
    }
  }

  redoLast() {
    if (this.deleted.length != 0) {
      this.shapes.push(this.deleted.pop());
      this.GlobalDraw();
    }
  }

  downloadCanvas() {
    const createEl = document.createElement('a');
    createEl.href = this.canvas.toDataURL();
    createEl.download = "canvas";
    createEl.click();
    createEl.remove();
  }

  uploadCanvas(e:any) {
    this.clearScreen()
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = readerEvent => {
      let content = readerEvent.target.result.toString();
      this.loadCanvas = new Image;
      this.loadCanvas.src = content;
      this.ctx.drawImage(this.loadCanvas,0,0);
      this.GlobalDraw();
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
