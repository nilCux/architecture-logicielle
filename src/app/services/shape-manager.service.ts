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
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    //default is a line :)
    this.drawer = new DrawerService(this.canvas, this.ctx, this.propertiesService);
    this.drawer.setCurrentShape("line");
    this.propertiesService.updateColor("black");
    this.propertiesService.updateWidth(1);
  }

  setShape(shape: string) {
    this.drawer.setCurrentShape(shape)
  }

  setColor(color: string) {
    this.propertiesService.updateColor(color);
    console.log('color', color)
  }

  setWidth(width: number) {
    this.propertiesService.updateWidth(width);
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

  undoLast() {
    this.drawer.undoLast();
  }

  redoLast() {
    this.drawer.redoLast();
  }
}

export abstract class action {

}
