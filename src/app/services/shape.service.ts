import { Injectable } from '@angular/core';
import { Point } from './shapes/point.service'
import { Properties } from './properties.service'

@Injectable({
  providedIn: 'root'
})
export abstract class Shape {
  public properties: Properties
  protected p1: Point
  protected p2: Point

  constructor(p1:Point, p2:Point, properties: Properties) {
    this.p1 = p1
    this.p2 = p2
    this.properties = properties
  }

  updateStartPoint(p: Point) {
    this.p1 = p
  }

  updateEndPoint(p: Point) {
    this.p2 = p
  }

  getStartPoint() {
    return this.p1
  }

  getEndPoint() {
    return this.p2
  }
  
  abstract drawSelf(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D): void

  abstract drawPhantom(canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D): void
}
