import { Injectable } from '@angular/core';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Triangle extends Shape {
  override drawSelf(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log("je me draw moi même, je suis un triangle");

    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // On calcule les coordonnées du troisième point en utilisant la trigonométrie
    const angle = Math.atan2(dy, dx);
    const x3 = this.p1.x + side * Math.cos(angle - (Math.PI / 3));
    const y3 = this.p1.y + side * Math.sin(angle - (Math.PI / 3));

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    ctx.stroke();
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const side = Math.sqrt(dx * dx + dy * dy);

    // On calcule les coordonnées du troisième point en utilisant la trigonométrie
    const angle = Math.atan2(dy, dx);
    const x3 = this.p1.x + side * Math.cos(angle - (Math.PI / 3));
    const y3 = this.p1.y + side * Math.sin(angle - (Math.PI / 3));

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.stroke();
  }
}