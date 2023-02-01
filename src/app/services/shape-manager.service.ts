import { Injectable } from '@angular/core';
import { DrawerService } from './drawer.service';
import { Properties } from './properties.service';
import { Circle } from './shapes/circle.service';
import { Line } from './shapes/line.service';
import { Rectangle } from './shapes/rectangle.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeManagerService {

  constructor(private propertiesService: Properties, private drawer: DrawerService) { }

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public shape: string
  public color: string

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    //default is a line :)
    this.shape = "line"
    this.drawer = new DrawerService(this.canvas, this.ctx, this.propertiesService);
  }

  setShape(shape: string) {
    this.shape = shape
    console.log(this.shape)
  }

  onDown(event: MouseEvent) {
    this.drawer.onDown(event, this.shape)
  }
}

export abstract class action {

}
