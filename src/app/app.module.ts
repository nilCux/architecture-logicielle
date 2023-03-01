import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BannerComponent } from './banner/banner.component';
import { ColorPickerModule } from './toolbar/color-picker/color-picker.module'

@NgModule({
  declarations: [AppComponent, ToolbarComponent, CanvasComponent, BannerComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
