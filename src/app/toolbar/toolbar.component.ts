import { Component, OnInit } from '@angular/core';
import { PainterService } from '../services/painter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeManager: PainterService) { }
  fill:boolean = false;

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setCurrentShape(shape);
  }

  changeWidth(width: number) {
    this.shapeManager.setWidth(width);
  }

  changeFill() {
    this.fill = !this.fill;
    this.shapeManager.setFill(this.fill);
  }

}
