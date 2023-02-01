import { Injectable } from '@angular/core';
import { Point } from './shapes/point.service'
import { Properties } from './properties.service'

@Injectable({
  providedIn: 'root'
})
export abstract class Shape {
  protected properties: Properties
  protected p1: Point
  protected p2: Point

  constructor(p1:Point, p2:Point, properties: Properties) {
    this.p1 = p1
    this.p2 = p2
    this.properties = properties
  }

  abstract drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,properties: Properties): void
}
