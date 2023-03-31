import { Component, OnInit } from '@angular/core';
import { PainterService } from '../services/painter.service';
import { Arrow } from '../services/shapes/arrow.service';
import { Circle } from '../services/shapes/circle.service';
import { Hexagon } from '../services/shapes/hexagon.service';
import { Line } from '../services/shapes/line.service';
import { Rectangle } from '../services/shapes/rectangle.service';
import { Text } from '../services/shapes/text.service';
import { Triangle } from '../services/shapes/triangle.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  private isFill: boolean = false;

  constructor(private shapeManager: PainterService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setCurrentShape(shape);
  }
  
  public onTextChange(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value != ""?(event.target as any).value:"Please enter text";
    this.shapeManager.setText(value);
  }

  public isTextSelected() {
    return this.shapeManager.getCurrentShape() instanceof Text;
  }

  public isLineSelected() {
    return this.shapeManager.getCurrentShape() instanceof Line;
  }

  public isRectSelected() {
    return this.shapeManager.getCurrentShape() instanceof Rectangle;
  }

  public isCircleSelected() {
    return this.shapeManager.getCurrentShape() instanceof Circle;
  }

  public isTriangleSelected() {
    return this.shapeManager.getCurrentShape() instanceof Triangle;
  }

  public isHexagonSelected() {
    return this.shapeManager.getCurrentShape() instanceof Hexagon;
  }

  public isArrowSelected() {
    return this.shapeManager.getCurrentShape() instanceof Arrow;
  }

  changeFill() {
    this.isFill = !this.isFill;
    this.shapeManager.setFill(this.isFill);
  }

  isFillSelected() {
    return this.shapeManager.getFill()
  }  

  isNotFillable() {
    return this.shapeManager.getCurrentShape() instanceof Line || this.shapeManager.getCurrentShape() instanceof Arrow;
  }

}
