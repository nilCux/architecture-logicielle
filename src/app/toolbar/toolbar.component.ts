import { Component, OnInit } from '@angular/core';
import { ShapeManagerService } from '../services/shape-manager.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeManager: ShapeManagerService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setShape(shape);
  }

  changeColor(color: string) {
    this.shapeManager.setColor(color);
  }

  changeWidth(width: number) {
    this.shapeManager.setWidth(width);
  }

}
