import { Component, OnInit } from '@angular/core';
import { ShapeManagerService } from '../services/shape-manager.service';

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

  constructor(private shapeManager: ShapeManagerService) { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.shapeManager.initCanvas(this.canvas);
  }


  onDown(e: MouseEvent) {
    this.shapeManager.onDown(e);
  }

  onUp(e: MouseEvent) {
    this.shapeManager.onUp(e);
  }

  clearScreen() {
    this.shapeManager.clearScreen();
  }

  onMouseMove(e) {
    this.shapeManager.onMouseMove(e);
  }

  mouseOut(e: MouseEvent) {
    this.shapeManager.mouseOut(e);
  }
}
