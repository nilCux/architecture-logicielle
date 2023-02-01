import { Injectable } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { Properties } from '../properties.service';
import { Shape } from '../shape.service'

@Injectable({
  providedIn: 'root'
})
export class Rectangle extends Shape {

  override drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,properties: Properties) {

    console.error("je me draw moi meme, je suis une ligne")
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
  }
}
