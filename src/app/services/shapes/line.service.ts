import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Line extends Shape {

  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D) {
    console.log("je me draw moi meme, je suis une ligne")
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
  }

  override drawPhantom(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
