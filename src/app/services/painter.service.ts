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
import { Text } from './shapes/text.service';

@Injectable({
  providedIn: 'root'
})

export class PainterService {

  private isMouseDown: Boolean = false;
  // Start point when mouse is down
  private startMouseDown: Point = { x: 0, y: 0 };
  // End point when mouse is down
  private endMouseDown: Point = { x: 0, y: 0 };

  private isAltPressed: Boolean = false;

  // Array of shapes to be drawn
  private shapes: Shape[] = [];
  // Deleted shapes, used to undo and redo drawings 
  private deleted: Shape[] = []

  // Current shape to be drawn
  private currentShapeInstance: Shape;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  // Canvas to be load
  private loadCanvas: HTMLImageElement;

  constructor(private propertiesService: Properties) {}


  public initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setCurrentShape("line");
    this.propertiesService.updateColor("rgba(0,19,255,1)");
    this.propertiesService.updateBackgroundColor("rgba(0,19,255,1)");
    this.propertiesService.updateWidth(2.5);
  }

  private globalDraw() {   
    // Clear canvas 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw load canvas if exist
    if(this.loadCanvas !== undefined)
      this.ctx.drawImage(this.loadCanvas,0,0)

    // Draw shape
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].drawSelf(this.ctx);
    }

    // Set properties for shape
    this.ctx.strokeStyle = this.propertiesService.getColor();
    this.ctx.lineWidth = this.propertiesService.getWidth();
  }

  public setColor(color: string) {
    this.propertiesService.updateColor(color);
  }

  public setBackgroundColor(backgroundColor: string) {
    this.propertiesService.updateBackgroundColor(backgroundColor);
  }

  public setWidth(width: number) {
    this.propertiesService.updateWidth(width);
  }

  public setFill(fill: boolean) {
    this.propertiesService.updateFill(fill);
  }

  public getFill() {
    return this.propertiesService.getFill();
  }

  public setCurrentShape(shape: string) {
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
      case "text":
        this.currentShapeInstance = new Text(new Point(), new Point(), this.propertiesService);
    }
  }

  public setText(text: string) {
    this.propertiesService.updateText(text);
    console.log("Changing text to " + this.propertiesService.getText());
  }

  public onDown(mouseEvent: MouseEvent) {
    this.isMouseDown = true;

    this.startMouseDown = {
      x: mouseEvent.offsetX,
      y: mouseEvent.offsetY
    };
    this.endMouseDown = {
      x: mouseEvent.offsetX,
      y: mouseEvent.offsetY
    }

    this.currentShapeInstance.updateStartPoint({
      x: mouseEvent.offsetX,
      y: mouseEvent.offsetY
    });

    this.currentShapeInstance.updateEndPoint({
      x: mouseEvent.offsetX,
      y: mouseEvent.offsetY
    });
  }

  public onUp(mouseEvent: MouseEvent) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.shapes.push(_.cloneDeep(this.currentShapeInstance));
      this.globalDraw();
    }
  }

  public clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.splice(0);
    this.loadCanvas = undefined;
  }

  public onMouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      // Draw old lines when tracing
      this.globalDraw();

      // Get mouse position
      this.endMouseDown = this.getMousePos(e);

      if (this.isAltPressed) {
        const offset = {
          x: this.endMouseDown.x - this.startMouseDown.x,
          y: this.endMouseDown.y - this.startMouseDown.y
        };
        this.currentShapeInstance.updateStartPoint({
          x: this.startMouseDown.x - offset.x,
          y: this.startMouseDown.y - offset.y
        });
      }
      this.currentShapeInstance.updateEndPoint(this.endMouseDown);

      this.currentShapeInstance.drawPhantom(this.ctx);

    }
  }

  public mouseOut(mouseEvent: MouseEvent) {
    if (this.isMouseDown) {
      this.onUp(mouseEvent);
	    this.altUp();
    }
  }

  public undoLast() {
    if (this.shapes.length != 0) {
      let last: Shape = this.shapes.pop();
      this.deleted.push(last);
      this.globalDraw();
    }
  }

  public redoLast() {
    if (this.deleted.length != 0) {
      this.shapes.push(this.deleted.pop());
      this.globalDraw();
    }
  }

  public altDown() {
    this.isAltPressed = true;
    const offset = {
      x: this.endMouseDown.x - this.startMouseDown.x,
      y: this.endMouseDown.y - this.startMouseDown.y
    };
    this.currentShapeInstance.updateStartPoint({
      x: this.startMouseDown.x - offset.x,
      y: this.startMouseDown.y - offset.y
    });
    this.globalDraw();
    if(this.isMouseDown){
      this.currentShapeInstance.drawPhantom(this.ctx);
    }
  }

  public altUp() {
    this.isAltPressed = false;
    this.currentShapeInstance.updateStartPoint(this.startMouseDown);
    this.globalDraw();
    if(this.isMouseDown){
      this.currentShapeInstance.drawPhantom(this.ctx);
    }
  }

  // Download current canvas to a new png file called "canvas"
  public downloadCanvas() {
    const createEl = document.createElement('a');
    createEl.href = this.canvas.toDataURL();
    createEl.download = "canvas";
    createEl.click();
    createEl.remove();
  }

  public uploadCanvas(readerEvent:any) {
    this.clearScreen();

    // Reading a file to be loaded
    let reader = new FileReader();
    reader.readAsDataURL(readerEvent.target.files[0]);

    // Draw loaded file on canvas
    reader.onload = readerEvent => {
      let content = readerEvent.target.result.toString();
      this.loadCanvas = new Image;
      this.loadCanvas.src = content;
      this.loadCanvas.onload = loadEvent => this.ctx.drawImage(this.loadCanvas,0,0);
   }
  }

  private getMousePos(mouseEvent: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: (mouseEvent.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
      y: (mouseEvent.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    }
  }

  public getCurrentShape() {
    return this.currentShapeInstance;
  }

}
