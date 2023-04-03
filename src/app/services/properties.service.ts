import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/** A plain data transfer object that encapsulates the properties of a shape. */
export class Properties {

  private color: string;
  private backgroundColor: string;
  private width: number;
  private text: string = "Please enter text";
  private isFill: boolean = false;

  constructor() {}

  public updateColor(color: string) {
    this.color = color;
  }

  public getColor() { 
    return this.color; 
  }

  public updateBackgroundColor(color: string) {
    this.backgroundColor = color;
  }

  public getBackgroundColor() { 
    return this.backgroundColor; 
  }

  public updateWidth(width: number) {
    this.width = width;
  }

  public getWidth() { 
    return this.width; 
  }

  public updateText(text: string) {
    this.text = text;
  }

  public getText() { 
    return this.text; 
  }

  public updateFill(fill: boolean) {
    this.isFill = fill;
  }

  public getFill() { 
    return this.isFill; 
  }
}
