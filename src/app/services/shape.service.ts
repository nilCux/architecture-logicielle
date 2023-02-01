import { Injectable } from '@angular/core';
import { DrawerService } from './drawer.service';
import { PropertiesService } from './properties.service';
import { LineService } from './shapes/line.service';
import { RectangleService } from './shapes/rectangle.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private propertiesService: PropertiesService) { }

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public shape: string
  public color: string
  public currentDrawer: DrawerService

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    //default is a line :)
    this.currentDrawer = new LineService(this.canvas, this.ctx, this.propertiesService);
  }
  
  setShape(shape: string) {
    this.shape = shape;
    console.log(this.shape);
    if (this.shape == "line") {
    this.currentDrawer = new LineService(this.canvas, this.ctx, this.propertiesService);
    } else if (this.shape == "rectangle") {
      this.currentDrawer = new RectangleService(this.canvas, this.ctx, this.propertiesService);
    } else if (this.shape == "circle") {
      //this.currentDrawer = new CircleService(this.canvas, this.ctx, this.propertiesService);
    }
  }

  onDown(event: MouseEvent) {
    this.currentDrawer.draw()
  }
}

export abstract class action {
  
}
