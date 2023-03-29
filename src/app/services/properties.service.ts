import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Properties {

  private color: string
  private backgroundColor: string
  private width: number
  private text: string = "Please enter text"
  private isFill: boolean = false

  constructor() {}

  updateColor(color: string) {
    this.color = color;
  }

  getColor() { return this.color; }

  updateBackgroundColor(color: string) {
    this.backgroundColor = color;
  }

  getBackgroundColor() { return this.backgroundColor; }

  updateWidth(width: number) {
    this.width = width;
  }

  getWidth() { return this.width; }

  updateText(text: string) {
    this.text = text;
  }

  getText() { return this.text; }

  updateFill(fill: boolean) {
    this.isFill = fill;
  }

  getFill() { return this.isFill; }
}
