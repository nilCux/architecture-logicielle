import { Component, OnInit } from '@angular/core';
import { ShapeManagerService } from '../services/shape-manager.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeService: ShapeManagerService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeService.setShape(shape);
  }

}
