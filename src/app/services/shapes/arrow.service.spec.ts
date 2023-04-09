import { TestBed } from '@angular/core/testing';

import { Arrow } from './arrow.service';

describe('ArrowService', () => {
  let service: Arrow;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arrow);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
