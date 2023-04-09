import { TestBed } from '@angular/core/testing';

import { Circle } from './circle.service';

describe('CircleService', () => {
  let service: Circle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Circle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
