import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { LineService } from './shapes/line.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DrawerService {

  constructor(protected canvas: HTMLCanvasElement, protected ctx: CanvasRenderingContext2D,protected properties: PropertiesService) {}

  draw() {
    
  }
}
