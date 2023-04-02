import { Component, AfterViewInit, Input, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { PainterService } from '../../../services/painter.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.sass']
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  // Hue received from the color slider
  @Input()
  hue: string;

  // Indicates if the color correspond to border or background
  @Input()
  isColorBackground: boolean;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  private color: string;
  private selectedPosition: {x: number; y: number};

  constructor(private shapeManager: PainterService) { this.color = 'rgba(0,19,255,1)'; }

  ngAfterViewInit() {
    this.hue = 'rgba(0,19,255,1)'
    this.canvas = <HTMLCanvasElement>document.getElementById('color-palette');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.selectedPosition = {x:this.canvas.width-20, y:20};
    this.draw();
  }

  // Draw color palette
  private draw() {
    const selectColorHeight = 10;

    this.ctx.fillStyle = this.hue;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // White gradient
    const whiteGrad = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Black gradient
    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the color selection circle
    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, selectColorHeight, 0, 2 * Math.PI);
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['hue'] && this.hue) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color = this.getColorAtPosition(pos.x, pos.y);
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  public onMouseUp(mouseEvent: MouseEvent) {
    this.mousedown = false;
    if( this.isColorBackground ) {
      this.shapeManager.setBackgroundColor(this.color)
    } else {
      this.shapeManager.setColor(this.color);
    }
    
  }

  public onMouseDown(mouseEvent: MouseEvent) {
    this.mousedown = true;
    this.selectedPosition = { x: mouseEvent.offsetX, y: mouseEvent.offsetY };
    this.draw();
    this.color = this.getColorAtPosition(mouseEvent.offsetX, mouseEvent.offsetY);

  }

  public onMouseMove(mouseEvent: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: mouseEvent.offsetX, y: mouseEvent.offsetY };
      this.draw();
      this.color = this.getColorAtPosition(mouseEvent.offsetX, mouseEvent.offsetY);
    }
  }

  private getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }
}