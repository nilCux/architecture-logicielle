import { Component, AfterViewInit, Input, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { PainterService } from '../../../services/painter.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.sass']
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
  @Input()
  hue: string;

  @Input()
  isColorBackground: boolean;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  private color: string;
  public selectedPosition: {x: number; y: number};

  constructor(private shapeManager: PainterService) { this.color = 'rgba(0,19,255,1)'; }

  ngAfterViewInit() {
    this.hue = 'rgba(0,19,255,1)'
    this.canvas = <HTMLCanvasElement>document.getElementById('color-palette');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.selectedPosition = {x:this.canvas.width-20, y:20};
    this.draw();
  }

  draw() {
    const selectColorHeight = 10;

    this.ctx.fillStyle = this.hue;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const whiteGrad = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, selectColorHeight, 0, 2 * Math.PI);
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue'] && this.hue) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color = this.getColorAtPosition(pos.x, pos.y);
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
    if( this.isColorBackground ) {
      this.shapeManager.setBackgroundColor(this.color)
    } else {
      this.shapeManager.setColor(this.color);
    }
    
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
    this.draw();
    this.color = this.getColorAtPosition(evt.offsetX, evt.offsetY);

  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
      this.draw();
      this.color = this.getColorAtPosition(evt.offsetX, evt.offsetY);
    }
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }
}