import { TestBed } from '@angular/core/testing';

import { PainterService } from './painter.service';

describe('PainterService', () => {
  let service: PainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
