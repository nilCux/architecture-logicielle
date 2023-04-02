import { Injectable } from '@angular/core';
import { Shape } from '../shape.service';

@Injectable({
  providedIn: 'root'
})
export class Text extends Shape {

  private setTextParameters(ctx: CanvasRenderingContext2D){
    if (this.endPoint.x - this.startPoint.x < 0){
      ctx.direction = "rtl";
    } else {
      ctx.direction = "ltr";
    }
    if (this.endPoint.y - this.startPoint.y < 0){
      ctx.textBaseline = "bottom"
    } else {
      ctx.textBaseline = "top"
    }
  }

  override drawSelf(ctx: CanvasRenderingContext2D) {    
    let fontheight = Math.floor(Math.abs(this.endPoint.y - this.startPoint.y));
    ctx.font = `${fontheight}px serif`;
    this.setTextParameters(ctx);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    let fullText = this.properties.getText();
    let wordArray = [];
    // Split the lines of the input text
    let textLines = fullText.split("\n");
    // Split the line's words
    for(let i = 0; i < textLines.length; i++){
      wordArray.push(textLines[i].split(" "));
    }
    let linesArray = []; // Line buffer for drawing (stores a list of string corresponding to the drawn lines of text)
    // For every line
    for(let i = 0; i < wordArray.length; i++){
      let j = 0;
      let line = ""; // Temporary word buffer to test the addition of words
      let words_stacked = 0;
      // Iterate over the words one by one
      while (j < wordArray[i].length){
        // Try to add a new word to the output line
        let tmpline = line + ((line == "")?"":" ") + wordArray[i][j];
        words_stacked += 1;
        // If line overflows, push the line to the output buffer
        if(ctx.measureText(tmpline).width > Math.abs(this.endPoint.x - this.startPoint.x)){
          if (words_stacked > 1){
            linesArray.push(line);
            line = wordArray[i][j];
            words_stacked = 1;
          } else { // Special case, if one word is enough to overflow, still write it
            linesArray.push(tmpline);
            // j += 1;
            words_stacked = 0;
            line = "";
          }
        } else {
          line = tmpline;
        }
        j += 1;
      }
      if(line != ""){
        linesArray.push(line); // Push words remaining to output buffer
      }
    }
    for(let i = 0; i < linesArray.length; i++){
      ctx.strokeText(linesArray[i], this.startPoint.x, this.startPoint.y  + ((this.endPoint.y > this.startPoint.y)?i:-(linesArray.length - i - 1)) * fontheight);
      if(this.properties.getFill()){
        ctx.fillStyle = this.properties.getBackgroundColor();
        ctx.fillText(linesArray[i], this.startPoint.x, this.startPoint.y + ((this.endPoint.y > this.startPoint.y)?i:-(linesArray.length - i - 1)) * fontheight);
      }
    }
  }

  override drawPhantom(ctx: CanvasRenderingContext2D): void {
    let fontheight = Math.floor(Math.abs(this.endPoint.y - this.startPoint.y));
    ctx.font = `${fontheight}px serif`;
    this.setTextParameters(ctx);
    ctx.lineWidth = this.properties.getWidth();
    ctx.strokeStyle = this.properties.getColor();
    let fullText = this.properties.getText();
    let wordArray = [];
    // Split the lines of the input text
    let textLines = fullText.split("\n");
    // Split the line's words
    for(let i = 0; i < textLines.length; i++){
      wordArray.push(textLines[i].split(" "));
    }
    let linesArray = []; // Line buffer for drawing (stores a list of string corresponding to the drawn lines of text)
    // For every line
    for(let i = 0; i < wordArray.length; i++){
      let j = 0;
      let line = ""; // Temporary word buffer to test the addition of words
      let words_stacked = 0;
      // Iterate over the words one by one
      while (j < wordArray[i].length){
        // Try to add a new word to the output line
        let tmpline = line + ((line == "")?"":" ") + wordArray[i][j];
        words_stacked += 1;
        // If line overflows, push the line to the output buffer
        if(ctx.measureText(tmpline).width > Math.abs(this.endPoint.x - this.startPoint.x)){
          if (words_stacked > 1){
            linesArray.push(line);
            line = wordArray[i][j];
            words_stacked = 1;
          } else { // Special case, if one word is enough to overflow, still write it
            linesArray.push(tmpline);
            // j += 1;
            words_stacked = 0;
            line = "";
          }
        } else {
          line = tmpline;
        }
        j += 1;
      }
      if(line != ""){
        linesArray.push(line); // Push words remaining to output buffer
      }
    }
    for(let i = 0; i < linesArray.length; i++){
      ctx.strokeText(linesArray[i], this.startPoint.x, this.startPoint.y  + ((this.endPoint.y > this.startPoint.y)?i:-(linesArray.length - i - 1)) * fontheight);
      if(this.properties.getFill()){
        ctx.fillStyle = this.properties.getBackgroundColor();
        ctx.fillText(linesArray[i], this.startPoint.x, this.startPoint.y + ((this.endPoint.y > this.startPoint.y)?i:-(linesArray.length - i - 1)) * fontheight);
      }
    }
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.rect(this.startPoint.x, this.startPoint.y, this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
