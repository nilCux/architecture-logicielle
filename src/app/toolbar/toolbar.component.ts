import { Component, OnInit } from '@angular/core';
import { PainterService } from '../services/painter.service';
import { Text } from '../services/shapes/text.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private shapeManager: PainterService) { }

  ngOnInit(): void {
  }

  changeShape(shape: string) {
    this.shapeManager.setCurrentShape(shape);
  }

  changeWidth(width: number) {
    this.shapeManager.setWidth(width);
  }
  
  public onTextChange(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value != ""?(event.target as any).value:"Please enter text";
    this.shapeManager.setText(value);
  }

  public isTextSelected() {
    return this.shapeManager.getCurrentShape() instanceof Text;
  }
}
