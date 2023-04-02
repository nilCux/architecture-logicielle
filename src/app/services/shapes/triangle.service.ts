import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Triangle extends Shape {

  override drawSelf(ctx: CanvasRenderingContext2D) {
    const dx = this.endPoint.x - this.startPoint.x;
    const dy = this.endPoint.y - this.startPoint.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // We calculate the coordinates of the third point using trigonometry
    const angle = Math.atan2(dy, dx);
    const x3 = this.startPoint.x + side * Math.cos(angle - (Math.PI / 3));
    const y3 = this.startPoint.y + side * Math.sin(angle - (Math.PI / 3));

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
    
    if(this.properties.getFill()){
      ctx.fillStyle = this.properties.getBackgroundColor();
      ctx.fill();
    }
  }

  override drawPhantom(ctx: CanvasRenderingContext2D): void {
    const dx = this.endPoint.x - this.startPoint.x;
    const dy = this.endPoint.y - this.startPoint.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // We calculate the coordinates of the third point using trigonometry
    const angle = Math.atan2(dy, dx);
    const x3 = this.startPoint.x + side * Math.cos(angle - (Math.PI / 3));
    const y3 = this.startPoint.y + side * Math.sin(angle - (Math.PI / 3));

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.stroke();
  }
}