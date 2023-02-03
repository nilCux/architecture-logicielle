import { Injectable } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Properties } from '../properties.service';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Rectangle extends Shape {

  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,properties: Properties) {

    console.error("je me draw moi meme, je suis un rectangle")    
    let width = this.p2.x - this.p1.x;
    let height = this.p2.y - this.p1.y;
    ctx.rect(this.p1.x, this.p1.y, width, height);
    ctx.stroke();
  }

  override drawPhantom(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, properties: Properties): void {
    ctx.beginPath();
    ctx.setLineDash([5]);
    let width = this.p2.x - this.p1.x;
    let height = this.p2.y - this.p1.y;
    ctx.rect(this.p1.x, this.p1.y, width, height);
    ctx.stroke();
  }
}
