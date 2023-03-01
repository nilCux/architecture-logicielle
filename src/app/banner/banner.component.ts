import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

  constructor(private shapeManager: DrawerService) { }

  ngOnInit(): void {
  }

  undoLast() {
    this.shapeManager.undoLast();
  }

  redoLast() {
    this.shapeManager.redoLast();
  }
}
