import { TestBed } from '@angular/core/testing';

import { Rectangle } from './rectangle.service';

describe('RectangleService', () => {
  let service: Rectangle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rectangle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
