import { Injectable } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { PropertiesService } from '../properties.service';

@Injectable({
  providedIn: 'root'
})
export class RectangleService extends DrawerService {

  constructor(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,properties: PropertiesService) { 
    super(canvas,ctx,properties);
  }

  override draw() {
    this.properties.backgroundColor
    DrawerService.list.push("lolrectangle");
    console.log(DrawerService.list);
    console.error("foisjoisjoisj")
  }
}
