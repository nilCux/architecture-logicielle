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

  constructor(private propertiesService: Properties) { }
  private drawer: DrawerService;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public shape: string

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    //default is a line :)
    this.drawer = new DrawerService(this.canvas, this.ctx, this.propertiesService);
    this.drawer.setCurrentShape("line");
  }

  setShape(shape: string) {
    this.drawer.setCurrentShape(shape)
  }

  setColor(color: string) {
    this.propertiesService.color = color;
    console.log('color', color)
  }

  setWidth(width: number) {
    this.propertiesService.width = width;
    console.log('width', width)
  }

  onDown(event: MouseEvent) {
    this.drawer.onDown(event)
  }

  clearScreen() {
    this.drawer.clearScreen()
  }

  onUp(e: MouseEvent) {
    this.drawer.onUp(e);
  }

  onMouseMove(e: MouseEvent) {
    this.drawer.onMouseMove(e);
  }

  mouseOut(e: MouseEvent) {
    this.drawer.mouseOut(e);
  }
}

export abstract class action {

}
