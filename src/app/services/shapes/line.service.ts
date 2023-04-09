import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Line extends Shape {

  override drawSelf(ctx: CanvasRenderingContext2D) {    
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
  }

  override drawPhantom(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
  }
}
