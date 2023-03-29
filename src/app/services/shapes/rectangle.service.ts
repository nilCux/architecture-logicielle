import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Rectangle extends Shape {

  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D) {

    console.log("je me draw moi meme, je suis un rectangle")    
    let width = this.p2.x - this.p1.x;
    let height = this.p2.y - this.p1.y;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(this.p1.x, this.p1.y, width, height);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.setLineDash([5]);
    let width = this.p2.x - this.p1.x;
    let height = this.p2.y - this.p1.y;
    ctx.rect(this.p1.x, this.p1.y, width, height);
    ctx.stroke();
  }
}
