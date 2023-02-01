import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeService: ShapeService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeService.setShape(shape);
  }

}
