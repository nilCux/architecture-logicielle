import { Component, AfterViewInit, HostListener } from '@angular/core';
import { PainterService } from 'src/app/services/painter.service';

@Component({
  selector: 'app-width-slider',
  templateUrl: './width-slider.component.html',
  styleUrls: ['./width-slider.component.sass']
})
export class WidthSliderComponent implements AfterViewInit {

  constructor(private shapeManager: PainterService) { this.width = 2.5; }

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  private selectedWidth: number;
  private width: number;

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('width-slider');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.selectedWidth = this.canvas.width*1/8;
    this.draw();
  }

  draw() {
    const height = 0.5;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.rect(0, (this.canvas.height-height)/2, this.canvas.width, height);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.selectedWidth, this.canvas.height/2, this.width, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
    this.shapeManager.setWidth(this.width);
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedWidth = evt.offsetX;
    this.width = evt.offsetX/10;
    this.draw();
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedWidth = evt.offsetX;
      this.width = evt.offsetX/10;
      console.log('width: ', this.width)
      this.draw();
    }
  }
}