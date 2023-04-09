import { TestBed } from '@angular/core/testing';

import { Shape } from './shape.service';

describe('ShapeService', () => {
  let service: Shape;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shape);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
