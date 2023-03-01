import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeManager: DrawerService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setCurrentShape(shape);
  }

  changeColor(color: string) {
    this.shapeManager.setColor(color);
  }

  changeWidth(width: number) {
    this.shapeManager.setWidth(width);
  }

}
