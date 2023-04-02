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
  private sliderHeight:number = 0.5;

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('width-slider');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.selectedWidth = this.canvas.width*1/8;
    this.draw();
  }

  // Draw width slider
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw a rectangle on which the width selection circle will be
    this.ctx.beginPath();
    this.ctx.rect(0, (this.canvas.height-this.sliderHeight)/2, this.canvas.width, this.sliderHeight);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();

    // Draw the width selection circle
    this.ctx.beginPath();
    this.ctx.arc(this.selectedWidth, this.canvas.height/2, this.width, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  // Set width when mouse is up
  @HostListener('window:mouseup', ['$event'])
  public onMouseUp(mouseEvent: MouseEvent) {
    this.mousedown = false;
    this.shapeManager.setWidth(this.width);
  }

  // Update width variable and redraw when mouse is down 
  public onMouseDown(mouseEvent: MouseEvent) {
    this.mousedown = true;
    this.selectedWidth = mouseEvent.offsetX;
    this.width = mouseEvent.offsetX/10;
    this.draw();
  }

  // Update width variable and redraw when mouse move and is down 
  public onMouseMove(mouseEvent: MouseEvent) {
    if (this.mousedown) {
      this.selectedWidth = mouseEvent.offsetX;
      this.width = mouseEvent.offsetX/10;
      this.draw();
    }
  }
}