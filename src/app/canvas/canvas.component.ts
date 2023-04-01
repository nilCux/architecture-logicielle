import { Component, OnInit, HostListener } from '@angular/core';
import { PainterService } from '../services/painter.service';

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

  constructor(private shapeManager: PainterService) { }

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

  @HostListener('document:keydown.control.z', ['$event'])
  undoLast() {
    this.shapeManager.undoLast();
  }

  @HostListener('document:keydown.control.y', ['$event'])
  redoLast() {
    this.shapeManager.redoLast();
  }

  @HostListener('document:keydown.alt', ['$event'])
  altDown(event: KeyboardEvent) {
	event.preventDefault();
	event.stopPropagation();
	this.shapeManager.altDown();
  }

  @HostListener('document:keyup.alt', ['$event'])
  altUp(event: KeyboardEvent) {
	event.preventDefault();
	event.stopPropagation();
	this.shapeManager.altUp();
  }

  dummy() {
    console.log("HELLO")
  }

}
