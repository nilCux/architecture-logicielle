import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Circle extends Shape {

  override drawSelf(ctx: CanvasRenderingContext2D) {
    let radius = Math.sqrt(Math.pow(this.endPoint.x-this.startPoint.x,2)+Math.pow(this.endPoint.y-this.startPoint.y,2))
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo( this.startPoint.x + radius, this.startPoint.y );
    ctx.arc(this.startPoint.x, this.startPoint.y, radius, 0, 2 * Math.PI);
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
    let radius = Math.sqrt(Math.pow(this.endPoint.x-this.startPoint.x,2)+Math.pow(this.endPoint.y-this.startPoint.y,2))
    ctx.moveTo( this.startPoint.x + radius, this.startPoint.y );
    ctx.arc(this.startPoint.x, this.startPoint.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
