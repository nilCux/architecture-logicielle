import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Arrow extends Shape {
  
  drawSelf(ctx: CanvasRenderingContext2D): void {    
    ctx.setLineDash([]);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor().toString();
    this.drawAnArrow(ctx, this.startPoint, this.endPoint, 5*this.properties.getWidth());
  }

  drawPhantom(ctx: CanvasRenderingContext2D): void {
    ctx.setLineDash([5]);
    this.drawAnArrow(ctx, this.startPoint, this.endPoint, 5*this.properties.getWidth());
  }

  drawAnArrow(ctx: CanvasRenderingContext2D, startPoint: { x: number; y: number; }, endPoint: { x: number; y: number; }, size: number) {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const angle = Math.atan2(dy, dx);
    
    ctx.save();
    ctx.translate(endPoint.x, endPoint.y);
    ctx.rotate(angle);
    ctx.beginPath();
    
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, size);

    ctx.moveTo(0.33*this.properties.getWidth(), 0.33*this.properties.getWidth());
    ctx.lineTo(-size, -size);
    
    ctx.moveTo(0, 0);
    ctx.restore();
    ctx.lineTo(startPoint.x, startPoint.y);
    ctx.closePath();

    ctx.stroke();
  }
}
