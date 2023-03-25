import { Component, AfterViewInit, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.sass']
})
export class ColorSliderComponent implements AfterViewInit {
  @Output()
  color: EventEmitter<string> = new EventEmitter();

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  private selectedWidth: number;

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('color-slider');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.selectedWidth = this.canvas.width*2/3;
    this.draw();
  }

  draw() {
    const gradientHeight = 10;
    const selectColorHeight = 15;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.ctx.beginPath();
    this.ctx.rect(0, (this.canvas.height-gradientHeight)/2, this.canvas.width, gradientHeight);

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = this.getColorAtPosition(this.selectedWidth, this.canvas.height/2);
    this.ctx.beginPath();
    this.ctx.arc(this.selectedWidth, this.canvas.height/2, selectColorHeight, 0, 2 * Math.PI);
    this.ctx.lineWidth = 3;
    this.ctx.fill();
    this.ctx.stroke();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedWidth = evt.offsetX;
    this.draw();
    this.emitColor(evt.offsetX, evt.offsetY);
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedWidth = evt.offsetX;
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }
}