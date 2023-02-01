import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Properties {

  public color: string
  public backgroundColor: string
  public width: number

  constructor() { }
}
