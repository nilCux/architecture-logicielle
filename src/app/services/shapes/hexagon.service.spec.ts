import { TestBed } from '@angular/core/testing';

import { HexagonService } from './hexagon.service';

describe('HexagonService', () => {
  let service: HexagonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HexagonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
