import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Text extends Shape {

  override drawSelf(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log("je me draw moi meme, je suis un bout de texte")
    let height = Math.floor(Math.abs(this.p2.y - this.p1.y));
    ctx.font = `${height}px serif`;
    ctx.strokeText(this.properties.getText(), this.p1.x, this.p1.y);
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    let height = Math.floor(Math.abs(this.p2.y - this.p1.y));
    ctx.font = `${height}px serif`;
    ctx.strokeText(this.properties.getText(), this.p1.x, this.p1.y);
  }
}
