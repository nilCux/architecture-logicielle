import { Component } from '@angular/core';
import { PainterService } from 'src/app/services/painter.service';


@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass']
})
export class ColorPickerComponent {
  public hue: string;
  public color: string;
  public isColorBackground: boolean = false;
  public isFill: boolean = false;


  constructor(private shapeManager: PainterService) { }
  changeFill() {
    this.isFill = !this.isFill;
    this.shapeManager.setFill(this.isFill);
  }
}


