import { Component, OnInit, HostListener } from '@angular/core';
import { PainterService } from '../services/painter.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.sass']
})
export class CanvasComponent implements OnInit {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(private shapeManager: PainterService) { }

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('drawzone');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.shapeManager.initCanvas(this.canvas);
  }


  public onDown(mouseEvent: MouseEvent) {
    this.shapeManager.onDown(mouseEvent);
  }

  public onUp(mouseEvent: MouseEvent) {
    this.shapeManager.onUp(mouseEvent);
  }

  public clearScreen() {
    this.shapeManager.clearScreen();
  }

  public onMouseMove(mouseEvent: MouseEvent) {
    this.shapeManager.onMouseMove(mouseEvent);
  }

  public mouseOut(mouseEvent: MouseEvent) {
    this.shapeManager.mouseOut(mouseEvent);
  }

  @HostListener('document:keydown.control.z', ['$event'])
  public undoLast() {
    this.shapeManager.undoLast();
  }

  @HostListener('document:keydown.control.y', ['$event'])
  public redoLast() {
    this.shapeManager.redoLast();
  }

  @HostListener('document:keydown.alt', ['$event'])
  public altDown(keyboardEvent: KeyboardEvent) {
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    this.shapeManager.altDown();
  }

  @HostListener('document:keyup.alt', ['$event'])
  public altUp(keyboardEvent: KeyboardEvent) {
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    this.shapeManager.altUp();
  }
}
