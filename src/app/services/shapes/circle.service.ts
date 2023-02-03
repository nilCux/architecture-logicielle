import { Injectable } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Properties } from '../properties.service';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Circle extends Shape {
  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,properties: Properties) {

    console.error("je me draw moi meme, je suis un cercle")
    let radius = Math.sqrt(Math.pow(this.p2.x-this.p1.x,2)+Math.pow(this.p2.y-this.p1.y,2))
    ctx.moveTo( this.p1.x + radius, this.p1.y );
    ctx.arc(this.p1.x, this.p1.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, properties: Properties): void {
    throw new Error('Method not implemented.');
  }
}
