import { TestBed } from '@angular/core/testing';

import { CircleService } from './circle.service';

describe('CircleService', () => {
  let service: CircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
