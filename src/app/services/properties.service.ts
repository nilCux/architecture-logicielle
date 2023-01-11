import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  public color: string
  public backgroundColor: string
  
  constructor() { }
}
