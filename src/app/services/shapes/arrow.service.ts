import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Arrow extends Shape {
  drawSelf(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.setLineDash([]);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor().toString();
    this.drawAnArrow(ctx, this.p1, this.p2, 5*this.properties.getWidth());
  }

  drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.setLineDash([5]);
    this.drawAnArrow(ctx, this.p1, this.p2, 5*this.properties.getWidth());
  }

  drawAnArrow(ctx: CanvasRenderingContext2D, p1: { x: number; y: number; }, p2: { x: number; y: number; }, size: number) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = Math.atan2(dy, dx);
    
    ctx.save();
    ctx.translate(p2.x, p2.y);
    ctx.rotate(angle);
    ctx.beginPath();
    
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, size);

    ctx.moveTo(0.33*this.properties.getWidth(), 0.33*this.properties.getWidth());
    ctx.lineTo(-size, -size);
    
    ctx.moveTo(0, 0);
    ctx.restore();
    ctx.lineTo(p1.x, p1.y);
    ctx.closePath();

    ctx.stroke();
  }
}
