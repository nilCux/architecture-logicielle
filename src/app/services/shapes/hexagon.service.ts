import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Hexagon extends Shape {

  override drawSelf(ctx: CanvasRenderingContext2D) {
    const dx = this.endPoint.x - this.startPoint.x;
    const dy = this.endPoint.y - this.startPoint.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // We calculate the coordinates of the third point using trigonometry
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
   
    const x3 = this.startPoint.x + side/2 * Math.cos(angle - (Math.PI / 3));
    const y3 = this.startPoint.y + side/2 * Math.sin(angle - (Math.PI / 3));
    ctx.lineTo(x3, y3);

    const x4 = this.endPoint.x + side/2 * Math.cos(angle - (Math.PI / 3)*2);
    const y4 = this.endPoint.y + side/2 * Math.sin(angle - (Math.PI / 3)*2);
    ctx.lineTo(x4, y4);

    ctx.lineTo(this.endPoint.x, this.endPoint.y);

    const x5= this.endPoint.x + side/2 * Math.cos(angle + (Math.PI / 3)*2);
    const y5 = this.endPoint.y + side/2 * Math.sin(angle + (Math.PI / 3)*2);
    ctx.lineTo(x5, y5);

    const x6 = this.startPoint.x + side/2 * Math.cos(angle + (Math.PI / 3));
    const y6 = this.startPoint.y + side/2 * Math.sin(angle + (Math.PI / 3));
    ctx.lineTo(x6, y6);
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
    
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
   
    const x3 = this.startPoint.x + side/2 * Math.cos(angle - (Math.PI / 3));
    const y3 = this.startPoint.y + side/2 * Math.sin(angle - (Math.PI / 3));
    ctx.lineTo(x3, y3);

    const x4 = this.endPoint.x + side/2 * Math.cos(angle - (Math.PI / 3)*2);
    const y4 = this.endPoint.y + side/2 * Math.sin(angle - (Math.PI / 3)*2);
    ctx.lineTo(x4, y4);

    ctx.lineTo(this.endPoint.x, this.endPoint.y);

    const x5= this.endPoint.x + side/2 * Math.cos(angle + (Math.PI / 3)*2);
    const y5 = this.endPoint.y + side/2 * Math.sin(angle + (Math.PI / 3)*2);
    ctx.lineTo(x5, y5);

    const x6 = this.startPoint.x + side/2 * Math.cos(angle + (Math.PI / 3));
    const y6 = this.startPoint.y + side/2 * Math.sin(angle + (Math.PI / 3));
    ctx.lineTo(x6, y6);
    ctx.closePath();

    ctx.stroke();
  }
}
