import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Rectangle extends Shape {

  override drawSelf(ctx: CanvasRenderingContext2D) {
    let width = this.endPoint.x - this.startPoint.x;
    let height = this.endPoint.y - this.startPoint.y;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(this.startPoint.x, this.startPoint.y, width, height);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
    
    if(this.properties.getFill()){
      ctx.fillStyle = this.properties.getBackgroundColor();
      ctx.fill();
    }
  }

  override drawPhantom(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.setLineDash([5]);
    let width = this.endPoint.x - this.startPoint.x;
    let height = this.endPoint.y - this.startPoint.y;
    ctx.rect(this.startPoint.x, this.startPoint.y, width, height);
    ctx.stroke();
  }
}
