import { Component } from '@angular/core';
import { PainterService } from 'src/app/services/painter.service';


@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass']
})
export class ColorPickerComponent {
  // Hue received from the color slider
  public hue: string;

  // Color to be transmitted to the color palette
  public color: string;

  // Indicates if the color correspond to border or background
  public isColorBackground: boolean = false;

  constructor(private shapeManager: PainterService) { }

  public isFill() {
    return this.shapeManager.getFill()
  }
}


