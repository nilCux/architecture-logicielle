import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Text extends Shape {

  private setTextParameters(ctx: CanvasRenderingContext2D){
    if (this.p2.x - this.p1.x < 0){
      ctx.direction = "rtl";
    } else {
      ctx.direction = "ltr";
    }
    if (this.p2.y - this.p1.y < 0){
      ctx.textBaseline = "alphabetic"
    } else {
      ctx.textBaseline = "hanging"
    }
  }

  override drawSelf(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log("je me draw moi meme, je suis un bout de texte")
    let height = Math.floor(Math.abs(this.p2.y - this.p1.y));
    ctx.font = `${height}px serif`;
    this.setTextParameters(ctx);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.strokeText(this.properties.getText(), this.p1.x, this.p1.y);
    if(this.properties.getFill()){
      ctx.fillStyle = this.properties.getBackgroundColor();
      ctx.fillText(this.properties.getText(), this.p1.x, this.p1.y);
    }
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    let height = Math.floor(Math.abs(this.p2.y - this.p1.y));
    ctx.font = `${height}px serif`;
    this.setTextParameters(ctx);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.fillText(this.properties.getText(), this.p1.x, this.p1.y);
  }
}
