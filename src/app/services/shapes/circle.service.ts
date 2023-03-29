import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Circle extends Shape {
  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D) {

    console.log("je me draw moi meme, je suis un cercle")
    let radius = Math.sqrt(Math.pow(this.p2.x-this.p1.x,2)+Math.pow(this.p2.y-this.p1.y,2))
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo( this.p1.x + radius, this.p1.y );
    ctx.arc(this.p1.x, this.p1.y, radius, 0, 2 * Math.PI);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
    if(this.properties.getFill()){
      ctx.fillStyle = this.properties.getBackgroundColor();
      ctx.fill();
    }
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.setLineDash([5]);
    let radius = Math.sqrt(Math.pow(this.p2.x-this.p1.x,2)+Math.pow(this.p2.y-this.p1.y,2))
    ctx.moveTo( this.p1.x + radius, this.p1.y );
    ctx.arc(this.p1.x, this.p1.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
