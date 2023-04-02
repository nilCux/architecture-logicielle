import { Injectable } from '@angular/core';
import { Point } from './shapes/point.service'
import { Properties } from './properties.service'

@Injectable({
  providedIn: 'root'
})
export abstract class Shape {

  public properties: Properties;
  protected startPoint: Point;
  protected endPoint: Point;

  constructor(startPoint:Point, endPoint:Point, properties: Properties) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.properties = properties;
  }

  public updateStartPoint(startPoint: Point) {
    this.startPoint = startPoint;
  }

  public updateEndPoint(endPoint: Point) {
    this.endPoint = endPoint;
  }
  
  abstract drawSelf(ctx: CanvasRenderingContext2D): void

  abstract drawPhantom(ctx: CanvasRenderingContext2D): void
}
