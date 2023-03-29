import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Hexagon extends Shape {
  override drawSelf(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log("je me draw moi même, je suis un triangle");

    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // On calcule les coordonnées du troisième point en utilisant la trigonométrie
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.p1.x, this.p1.y);
   
    const x3 = this.p1.x + side/2 * Math.cos(angle - (Math.PI / 3));
    const y3 = this.p1.y + side/2 * Math.sin(angle - (Math.PI / 3));
    ctx.lineTo(x3, y3);

    const x4 = this.p2.x + side/2 * Math.cos(angle - (Math.PI / 3)*2);
    const y4 = this.p2.y + side/2 * Math.sin(angle - (Math.PI / 3)*2);
    ctx.lineTo(x4, y4);

    ctx.lineTo(this.p2.x, this.p2.y);

    const x5= this.p2.x + side/2 * Math.cos(angle + (Math.PI / 3)*2);
    const y5 = this.p2.y + side/2 * Math.sin(angle + (Math.PI / 3)*2);
    ctx.lineTo(x5, y5);

    const x6 = this.p1.x + side/2 * Math.cos(angle + (Math.PI / 3));
    const y6 = this.p1.y + side/2 * Math.sin(angle + (Math.PI / 3));
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

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // On calcule les coordonnées du troisième point en utilisant la trigonométrie
    const angle = Math.atan2(dy, dx);
    

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.p1.x, this.p1.y);
   
    const x3 = this.p1.x + side/2 * Math.cos(angle - (Math.PI / 3));
    const y3 = this.p1.y + side/2 * Math.sin(angle - (Math.PI / 3));
    ctx.lineTo(x3, y3);

    const x4 = this.p2.x + side/2 * Math.cos(angle - (Math.PI / 3)*2);
    const y4 = this.p2.y + side/2 * Math.sin(angle - (Math.PI / 3)*2);
    ctx.lineTo(x4, y4);

    ctx.lineTo(this.p2.x, this.p2.y);

    const x5= this.p2.x + side/2 * Math.cos(angle + (Math.PI / 3)*2);
    const y5 = this.p2.y + side/2 * Math.sin(angle + (Math.PI / 3)*2);
    ctx.lineTo(x5, y5);

    const x6 = this.p1.x + side/2 * Math.cos(angle + (Math.PI / 3));
    const y6 = this.p1.y + side/2 * Math.sin(angle + (Math.PI / 3));
    ctx.lineTo(x6, y6);
    ctx.closePath();

    ctx.stroke();
  }
}
