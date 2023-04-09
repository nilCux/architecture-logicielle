import { TestBed } from '@angular/core/testing';

import { TriangleService } from './triangle.service';

describe('TriangleService', () => {
  let service: TriangleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriangleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
