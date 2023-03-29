import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeManager: DrawerService) { }
  fill:boolean = false;
  colorSelector:boolean = true;
  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setCurrentShape(shape);
  }

  changeColor(color: string) {
    this.shapeManager.setColor(color);
  }

  changeBackgroundColor(color: string) {
    this.shapeManager.setBackgroundColor(color);
  }

  changeWidth(width: number) {
    this.shapeManager.setWidth(width);
  }

  changeFill() {
    this.fill = !this.fill;
    this.shapeManager.setFill(this.fill);
  }

}
